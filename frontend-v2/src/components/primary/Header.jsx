// src/components/Header.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";

import bell from "../../assets/img/bell.svg"
import profile from "../../assets/img/profile.png"
import defProfile from "../../assets/img/avatar.jpg"

import { useAuth } from "../../context/AuthContext";

const Header = () => {
    const { user_profile } = useAuth();
    const [profilePicture, setProfilePicture] = useState(
		user_profile.profile_picture
	);

	return (
		<div className="header">
                <div className="container flex">
                    <div className="harmbuger-btn">
                        <div className="ico harmbuger">
                            <i className='bx bx-menu'></i>
                        </div>
                    </div>

                    <div className="header-utils">
                        <Formik
                            onSubmit={() => {}}
                        >
                            {({ isSubmitting }) => (
                                <div className="search-wrap flex flexCenter">
                                    <Form>
                                        <Field
                                            id="search-field"
											type="text"
											name="s"
											className="rounded form-control search-field"
                                            placeholder="What would you like to find?"
										/>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>

                    <div className="header-icons flex">
                        <div className="notif-ico">
                            <div className="count">5</div>
                            <div className="fitImg">
                                <img src={bell} alt="" />
                            </div>
                        </div>
                        <div className="profile-ico">
                            <div className="profile-img fitImg">
                                <img src={profilePicture || defProfile} alt="profile image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	);
};

export default Header;
