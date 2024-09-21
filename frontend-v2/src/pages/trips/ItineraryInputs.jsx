import React from 'react'
import { Field, ErrorMessage } from "formik";

import Btn from "../../components/ui/Btn";

const ItineraryInputs = ({ index, categories, actions }) => {
	const {remove, push} = actions;
	return (
		<div className="form-groups grid" key={index}>
			<div className="form-group no-margin">
				<label className="label">Name</label>
				<Field
					type="text"
					name={`itineraries.${index}.name`}
					className="rounded form-control"
				/>
				<ErrorMessage
					name={`itineraries.${index}.name`}
					component="div"
					className="err-msg"
				/>
			</div>

			<div className="form-group no-margin">
				<label className="label">Category</label>
				<Field
					as="select"
					name={`itineraries.${index}.category`}
					className="rounded form-control"
				>
					<option value="">Select Category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</Field>
				<ErrorMessage
					name={`itineraries.${index}.category`}
					component="div"
					className="err-msg"
				/>
			</div>

			<div className="form-group no-margin">
				<label className="label">Amount</label>
				<Field
					type="number"
					name={`itineraries.${index}.amount`}
					className="rounded form-control"
				/>
				<ErrorMessage
					name={`itineraries.${index}.amount`}
					component="div"
					className="err-msg"
				/>
			</div>

			<div className="form-group no-margin">
				<label className="label" hidden>
					Delete
				</label>
				<div className="actions flex flex-space-between">
					<Btn
						type="button"
						txt={"Delete"}
						className="del"
						handleClick={() => remove(index)}
					/>
					<Btn
						type="button"
						txt={"Add New"}
						handleClick={() =>
							push({
								name: "",
								category: "",
								amount: "",
							})
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default ItineraryInputs