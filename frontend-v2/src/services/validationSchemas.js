import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

export const signupSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	firstname: Yup.string().required("First name is required"),
	lastname: Yup.string().required("Last name is required"),
	country: Yup.string().required("Country is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
});



export const profileEditSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	firstname: Yup.string().required("First name is required"),
	lastname: Yup.string().required("Last name is required"),
	country: Yup.string().required("Country is required"),
	phone: Yup.string().nullable(),
	gender: Yup.string().required("Gender is required"),
	profile_picture: Yup.string().url("Invalid URL").nullable(),
});


export const newTripSchema = Yup.object().shape({
	destination: Yup.string().required("Destination is required"),
	amount: Yup.number().required("Budget is required"),
	start_date: Yup.date().required("Start Date is required"),
	end_date: Yup.date().required("End Date is required")
	.test("is-greater", "End Date must be later than Start Date", function (value) {
			const { start_date } = this.parent;
			return !start_date || !value || new Date(value) >= new Date(start_date);
		}),
	itineraries: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().required("Name is required"),
			category: Yup.string().required("Category is required"),
			amount: Yup.number().required("Amount is required"),
		})
	),
});
