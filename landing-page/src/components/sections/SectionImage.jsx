import React from "react";

const SectionImage = ({img, altText=""}) => {
	return (
		<>
			<div className="noPad">
				<div className="card logo">
					<div className="cardImg">
						<img src={img} alt={altText} srcSet="" />
					</div>
				</div>
			</div>
		</>
	);
};

export default SectionImage;
