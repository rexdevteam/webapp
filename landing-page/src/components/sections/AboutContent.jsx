import React from "react";

const AboutContent = () => {
    const reasons = [
		{ title: "Expert Staff", description: "Our experienced doctors and nurses provide top-quality care." },
		{ title: "Comprehensive Services", description: "We offer a wide range of medical treatments." },
		{ title: "Modern Facilities", description: "Our clinic features the latest medical technology." },
		{ title: "Personalized Care", description: "We tailor treatments to meet your individual needs." },
		{ title: "Patient-Centered", description: "Your comfort and satisfaction are our priorities." }
	];

	return (
		<>
			<div className="noPad flex flexCenter">
				<div className="txtContain">
					<h3 className="secTitle"> Why You Choose Us? </h3>
					<ul>
						{reasons.map((reason, index) => (
							<li key={index}> 
								<strong>{reason.title}:</strong> {reason.description}
							</li>
						))}
					</ul>

					<a linkTo="">
						Learn More
						<span style={{ fontSize: "18px", fontWeight:"900", marginTop: "15px", display: "inline-block"}}> →</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default AboutContent;
