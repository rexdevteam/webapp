import React from "react";

const SectionBody = ({title, content, cta=""}) => {
	return (
		<>
			<div className="noPad flex flexCenter">
                <div className="txtContain">
                    <h3> {title} </h3>

                </div>
            </div>
		</>
	);
};

export default SectionBody;
