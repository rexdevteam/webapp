import React from "react";
import AboutContent from "./AboutContent";
import SectionImage from "./SectionImage";

import "../../assets/css/about.css"
import surgeryImg from "../../assets/img/surgery.png";

const About = () => {
	return (
		<>
			<div className="container col-12 noPad flex flexCenter row">
				<SectionImage
					img={surgeryImg}
					altText="docs in surgery"
				/>
                
				<AboutContent />
			</div>
		</>
	);
};

export default About;
