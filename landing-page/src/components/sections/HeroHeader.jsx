import React from "react";
import "../../assets/library/boxicons/css/only.used.boxicons.css"
import doctor from "../../assets/img/doctor.png"

const HeroHeader = () => {
	return (
		<>
			<div className="hero-body flex">
				<div className="hero-txt flexCenter">
					<h2>
						Book Appointment With Your <span>Favourite</span> Doctor
					</h2>
				</div>

				<div className="hero-search">
					<div className="search-box flex">
						<div className="name">
							<select name="doctors" id="doctorsNames">
								<option value="none">Doctor</option>
								<option value="Emmanuel">Emmanuel</option>
								<option value="Ade">Ade</option>
								<option value="Martins">Martins</option>
								<option value="Femi">Femi</option>
							</select>
						</div>

						<div className="location">
							<select name="location" id="doctorsLocation">
								<option value="none">Location</option>
								<option value="Nigeria">Nigeria</option>
								<option value="UK">UK</option>
								<option value="UnitedEmirates">United Emirates</option>
								<option value="France">France</option>
							</select>
						</div>

						<div className="btn search-btn">
							<i className="bx bx-search"></i>
						</div>
					</div>
				</div>
			</div>

			<div className="arc"></div>

			<div className="doc-img fitImg"></div>

			<div className="hero-footer">
				<div className="container">
					<div className="stats">
						<div className="number">24/7</div>
						<p> Online Support </p>
					</div>
					<div className="stats">
						<div className="number">100+</div>
						<p> Doctors </p>
					</div>
					<div className="stats">
						<div className="number">1M+</div>
						<p> Active Patients </p>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroHeader;
