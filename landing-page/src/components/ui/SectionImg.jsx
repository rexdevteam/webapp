import React from 'react'

const SectionImg = ({ img, altText = "" }) => {
	return (
		<>
			<div className="noPad col-6">
				<div className="section-img">
					<div className="card-img">
						<img src={img} alt={altText} srcSet="" />
					</div>
				</div>
			</div>
		</>
	);
};

export default SectionImg
