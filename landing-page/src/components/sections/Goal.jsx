import React from "react";
import GoalContent from "./GoalContent";
import SectionImage from "./SectionImage";

import "../../assets/css/goal.css";
import patientImg from "../../assets/img/patient.png";

const Goal = () => {
	return (
		<>
			<div className="container col-12 noPad flex flexCenter row">
				<GoalContent />
				<SectionImage img={patientImg} altText="patient" />
			</div>
		</>
	);
};

export default Goal;
