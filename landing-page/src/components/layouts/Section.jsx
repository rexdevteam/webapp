import React from "react";

const Section = ({id, classes, components}) => {
    // Ensure components is an array and check its length
    const isValidComponents = Array.isArray(components) && components.length <= 2;

	return (
		<>
			<section id={id} className={`col-12 ${classes}`}>
				<div className="container col-12">
					{isValidComponents && components.length < 2 ? (
						components
					) : (
						<div className="container col-12 noPad flex flexCenter row">
							{components}
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Section;
