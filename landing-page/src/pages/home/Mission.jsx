import React from 'react'

// styles
import "./css/mission.css"

// img
import tripDashboard from "../../assets/img/trips-dashboard.png"

const Mission = () => {
    return (
		<>
			<div className="mission-statement">
				<div className="feature container col-12 noPad flex">
					<div className="noPad flex flexCenter col-12">
						<div className="txtContain flex flexCenter">
							<p>
								<span> Our Mission </span>
							</p>
							<h3 className="secTitle">
								Empowering travelers to budget, track, and save.
							</h3>

							<p>
								At ExpenseVoyage, we believe in the power of
								smart travel. Our mission is to empower
								travelers to budget, track, and save on their
								adventures. We understand that every trip is
								unique, and we're here to help you make the most
								of your journey.
							</p>
						</div>

						<div className="card fitImg noPad">
							<img
								src={tripDashboard}
								alt="dashboard for trips"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Mission