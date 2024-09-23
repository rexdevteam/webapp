import React from "react";
import "../../assets/css/services.css"
import virusIcon from "../../assets/icons/virus.svg";
import heartIcon from "../../assets/icons/heart.svg";
import cupIcon from "../../assets/icons/cup.svg";
import brainIcon from "../../assets/icons/brain.svg"

const Services = () => {
	return (
		<>
			<div className="secTitle">
				<h2> Our Consulting Specialists </h2>
			</div>
			<div className="grid service-cards">
				<div className="card">
					<div className="card-icon">
						<img src={virusIcon} alt="" srcSet="" />
					</div>
					<h3 className="card-title">Covid-19 Test</h3>
					<p className="card-content">
						Our Covid-19 tests ensure accurate results, providing
						peace of mind and safety for all.
					</p>
				</div>
				<div className="card">
					<div className="card-icon">
						<img src={heartIcon} alt="" srcSet="" />
					</div>
					<h3 className="card-title">Heart Lungs</h3>
					<p className="card-content">
						Our specialists offer expert care for your heart and
						lungs, ensuring a healthy and active life.
					</p>
				</div>
				<div className="card">
					<div className="card-icon">
						<img src={cupIcon} alt="" srcSet="" />
					</div>
					<h3 className="card-title">Supplement</h3>
					<p className="card-content">
						Nourish your body and boost your health with our trusted
						and high-quality supplements.
					</p>
				</div>
				<div className="card">
					<div className="card-icon">
						<img src={brainIcon} alt="" srcSet="" />
					</div>
					<h3 className="card-title">Mental Health</h3>
					<p className="card-content">
						Empower your mental well-being with compassionate care
						and holistic solutions from our experts.
					</p>
				</div>
			</div>
		</>
	);
};

export default Services;
