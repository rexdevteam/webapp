from flask import current_app
from typing import Any

def console_log(label: str ="INFO", data: Any =None) -> None:
    """
    Print a formatted message to the console for visual clarity.

    Args:
        label (str, optional): A label for the message, centered and surrounded by dashes. Defaults to 'Label'.
        data: The data to be printed. Can be of any type. Defaults to None.
    """
    
    app = current_app
    logger = app.logger
    logger.info(f"\n\n{label:-^50}\n {data} \n{'//':-^50}\n\n", stacklevel=2)


def log_exception(label: str ="EXCEPTION", data: Any = "Nothing") -> None:
    """
    Log an exception with details to a logging handler for debugging.

    Args:
        label (str, optional): A label for the exception, centered and surrounded by dashes. Defaults to 'EXCEPTION'.
        data: Additional data to be logged along with the exception. Defaults to 'Nothing'.
    """

    app = current_app
    logger = app.logger
    logger.exception(f"\n\n{label:-^50}\n {str(data)} \n {'//':-^50}\n\n", stacklevel=2)