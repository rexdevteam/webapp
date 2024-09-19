// src/components/Header.jsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import bell from "../../assets/img/bell.svg"
import profile from "../../assets/img/download.png"

const Header = () => {
	return (
		<div className="header">
                <div className="container flex">
                    <div className="harmbuger-btn">
                        <div className="ico harmbuger">
                            <i className='bx bx-menu'></i>
                        </div>
                    </div>

                    <div className="header-utils">
                        <form action="">
                            <div className="search-wrap flex flexCenter">
                                <input type="text" name="s" id="search-field" className="search-field" value="" placeholder="What would you like to find?" />
                                <button className="search-btn">
                                    <i className="bx bx-search"></i>
                                </button>
                            </div>
                        </form>
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
                                <img className="prof-img"  src={profile} alt="profile image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	);
};

export default Header;
