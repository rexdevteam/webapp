// src/components/Header.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";

import defProfile from "../../assets/img/avatar.jpg"
import { useAuth } from "../../context/AuthContext";
import Notification from "../notification/Notification";

const Header = ({ handleSidebarToggle }) => {
    const { user_profile } = useAuth();
    const [profilePicture, setProfilePicture] = useState(
		user_profile.profile_picture
	);


	return (
		<div className="header">
                <div className="container flex">
                    <div className="hamburger-btn flex flexCenter" onClick={handleSidebarToggle}>
                        <div className="ico hamburger flex flexCenter">
                            <MenuIcon sx={{ fontSize: 50 }} />
                        </div>
                    </div>

                    <div className="header-utils flex">
                        <div className="search-box">
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
                    </div>

                    <div className="header-icons flex">
                        <Notification />

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
