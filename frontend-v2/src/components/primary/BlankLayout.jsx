import React, { useState } from "react";

const BlankLayout = ({ children }) => {
	return (
		<div>
			<main style={{margin:"0px"}}>
				<div className="wrapper">
					{children}
				</div>
			</main>
		</div>
	);
};

export default BlankLayout;
