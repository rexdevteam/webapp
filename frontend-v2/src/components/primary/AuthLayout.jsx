import React, { useState } from "react";
import "../../assets/css/form.css"

const AuthLayout = ({ children }) => {
	return (
		<div>
			<main style={{ margin: "0px" }}>
				<div className="wrapper flex flexCenter">
					<div id="auth" className="card form-wrapper">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
};

export default AuthLayout;
