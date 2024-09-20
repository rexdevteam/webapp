import openpyxl
import pandas as pd
from io import BytesIO
from flask import make_response, Response
from typing import List, Dict, Any

from ...models import AppUser, Trip, Itinerary



def export_to_excel(data: List[AppUser | Trip | Itinerary], filename: str, visitor_type: str = None) -> Response:
    """
    Convert data from any SQLAlchemy model to an Excel file and return as a Flask response.
    """
    
    # Convert list of model instances to a list of dictionaries
    data_dicts = [instance.to_excel_data(visitor_type) for instance in data] if visitor_type else [instance.to_excel_data() for instance in data]
    
    # Convert to DataFrame
    df = pd.DataFrame(data_dicts)
    
    # Prepare the Excel writer
    output = BytesIO()
    writer = pd.ExcelWriter(output, engine='openpyxl')
    df.to_excel(writer, index=False, sheet_name='Sheet1')
    
    # Access the workbook and sheet to customize formatting
    workbook = writer.book
    sheet = writer.sheets['Sheet1']
    
    # Set uniform column width
    uniform_width = 25
    for col in sheet.columns:
        max_length = max(len(str(cell.value)) for cell in col)  # Determine max length of data in each column
        adjusted_width = max(uniform_width, max_length)
        sheet.column_dimensions[col[0].column_letter].width = adjusted_width
    
    # Apply bold font to headers
    header_font = openpyxl.styles.Font(bold=True)
    for cell in sheet["1:1"]:  # First row (header)
        cell.font = header_font
    
    # Finalize and return the response
    writer._save()
    output.seek(0)

    response = make_response(output.getvalue())
    response.headers["Content-Disposition"] = f"attachment; filename={filename}.xlsx"
    response.headers["Content-type"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    
    # Add the filename as a custom header
    response.headers["X-Filename"] = f"{filename}.xlsx"
    
    # Expose the custom header to the client
    response.headers["Access-Control-Expose-Headers"] = "X-Filename"
    
    return response
