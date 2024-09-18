import React, { useState } from "react";

const BlankLayout = () => {
	return (
		<div>
			<main>
				<div className="wrapper">{children}</div>
			</main>
		</div>
	);
};

export default BlankLayout;
