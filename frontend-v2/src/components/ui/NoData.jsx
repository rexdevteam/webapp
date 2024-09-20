import React from "react";

const NoData = ({ title, headBtn = "" }) => {
	return (
		<>
			<div className="no-data flex flexCenter">
				<span className="title"> {title} </span>
				{headBtn ? headBtn : <></>}
			</div>
		</>
	);
};

export default NoData;
