import React from "react";

const GoalContent = () => {
	return (
		<>
			<div className="noPad flex flexCenter">
				<div className="txtContain">
					<h3 className="secTitle">
						{" "}
						The Future of <span> Quality Health </span>
					</h3>

					<p>
						At E-Sheba, we are committed to advancing healthcare
						through innovation and excellence. Our vision for the
						future of quality health includes:
					</p>
					<p>
						<strong>Advanced Medical Technology:</strong> We
						continuously integrate the latest medical technologies
						to provide precise and effective treatments.
					</p>
					<p>
						<strong>Personalized Patient Care:</strong> Leveraging
						data and advanced diagnostics, we tailor healthcare
						plans to meet the unique needs of each patient.
					</p>
					<p>
						<strong>Holistic Health Approaches:</strong> We
						emphasize a comprehensive approach to health that
						includes preventive care, wellness programs, and mental
						health support.
					</p>
					<p>
						<strong>Collaborative Healthcare:</strong> Our
						multidisciplinary teams work together to ensure seamless
						and coordinated care for our patients.
					</p>

					<a linkTo="">
						Learn More
						<span
							style={{
								fontSize: "18px",
								fontWeight: "900",
								marginTop: "15px",
								display: "inline-block",
							}}
						>
							{" "}
							→
						</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default GoalContent;
