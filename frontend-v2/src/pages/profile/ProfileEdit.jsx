import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { profileEditSchema } from "../../services/validationSchemas";
import { sendApiRequest } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

import Btn from "../../components/ui/Btn";
import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";
import ProfileInfo from "./ProfileInfo";
import "./profile.css";
import defProfile from "../../assets/img/avatar.jpg"

const ProfileEdit = () => {
	const navigate = useNavigate();
	const { user_profile, access_token } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(
		user_profile.profile_picture
	);

    const { setAlert, persistAlert } = useAlert();

    const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			setProfilePicture(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
            const formData = new FormData();
            formData.append("full_name", values.full_name);
			formData.append("email", values.email);
			formData.append("firstname", values.firstname);
			formData.append("lastname", values.lastname);
			formData.append("phone", values.phone);
			formData.append("gender", values.gender);
			formData.append("country", values.country);
			if (selectedFile) {
				formData.append("profile_picture", selectedFile);
			}

            const data = await sendApiRequest("/profile", {
				method: "PUT",
				headers: {},
				body: formData,
			});
			console.log(data);

			// Update local storage with new user data
            const { user_data } = data.data;
			console.log(user_data);

			localStorage.setItem("user_profile", JSON.stringify(user_data));
			persistAlert(data?.message, "success");
			navigate("/profile");
		} catch (error) {
			console.error("Error updating profile:", error);
			setAlert(error?.message, "error");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div id="profile">
			<Helmet>
				<title>Edit Profile - Expense Voyage</title>
			</Helmet>

			<PageHead title={"Edit Profile"} />

			<div className="profile-container">
				<div id="profile-edit" className="card form-wrapper">
					<Formik
						initialValues={{
							email: user_profile.email,
							firstname: user_profile.firstname,
							lastname: user_profile.lastname,
							phone: user_profile.phone,
							gender: user_profile.gender,
							country: user_profile.country,
							profile_picture: user_profile.profile_picture,
						}}
						validationSchema={profileEditSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<div className="form-profile-pic flex flexCenter">
									<div className="profile-pic-container">
										<div className="profile-pic fitImg">
											<img
												src={
													profilePicture || defProfile
												}
												alt="Profile pic"
											/>
										</div>
										<input
											type="file"
											id="profile_picture"
											style={{ display: "none" }}
											onChange={handleFileChange}
										/>
										<Btn
											txt={"Edit"}
											type="button"
											className="edit-button"
											handleClick={() =>
												document
													.getElementById(
														"profile_picture"
													)
													.click()
											}
										/>
									</div>
								</div>

								<div className="profile-info">
									<div className="form-group">
										<label className="label">Email</label>
										<Field
											type="email"
											name="email"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>
								<div className="profile-info">
									<div className="form-group">
										<label htmlFor="firstname">
											First Name
										</label>
										<Field
											name="firstname"
											type="text"
											label="First Name"
											margin="normal"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="firstname"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>
								<div className="profile-info">
									<div className="form-group">
										<label htmlFor="lastname">
											Last Name
										</label>
										<Field
											name="lastname"
											type="text"
											label="Last Name"
											margin="normal"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="lastname"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>
								<div className="profile-info">
									<div className="form-group">
										<label className="label">Phone</label>
										<Field
											type="text"
											name="phone"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="phone"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>
								<div className="profile-info">
									<div className="form-group">
										<label className="label">Gender</label>
										<Field
											as="select"
											name="gender"
											className="rounded form-control"
										>
											<option value="male">Male</option>
											<option value="female">
												Female
											</option>
											<option value="other">Other</option>
										</Field>
										<ErrorMessage
											name="gender"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>
								<div className="profile-info">
									<div className="form-group">
										<label className="label">Country</label>
										<Field
											type="text"
											name="country"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="country"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>
								<Btn
									txt={"Save Changes"}
									type="submit"
									isLoading={isSubmitting}
								/>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ProfileEdit;
