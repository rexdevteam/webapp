import React from "react";
import { FieldArray } from "formik";

import Btn from "../../components/ui/Btn";
import ItineraryInputs from "./ItineraryInputs";

const SubItineraryForm = ({ values, categories }) => {
    return (
		<FieldArray name="itineraries">
			{({ insert, remove, push }) => (
				<div className="itinerary-sub-form">
					<div className="sub-form-head flex flex-space-between">
						<div className="title">Add Itineraries</div>
						<Btn
							txt={"+"}
							className="add"
							type="button"
							handleClick={() =>
								push({
									name: "",
									category: "",
									amount: "",
								})
							}
						/>
					</div>

					{values.itineraries.length > 0 &&
						values.itineraries.map((itinerary, index) => (
							<ItineraryInputs
								key={index}
								index={index}
								categories={categories}
								remove={remove}
								actions={{
									insert,
									remove,
									push,
								}}
							/>
						))}
				</div>
			)}
		</FieldArray>
	);
}

export default SubItineraryForm