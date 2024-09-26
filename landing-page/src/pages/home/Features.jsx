import React from 'react'
import SectionImg from '../../components/ui/SectionImg';

import "./css/features.css"
import illustrationImg from "../../assets/img/x-Illustrator.png";
import rideIllustrationImg from "../../assets/img/ride-illustration.png";

const Features = () => {
    return (
		<>
			<div className="features-list">
				<div className="feature container col-12 noPad flex">
					{/* <AboutContent /> */}
					<div className="noPad flex flexCenter col-6">
						<div className="txtContain">
							<p>
								<span> Free some cost </span>
							</p>
							<h3 className="secTitle">
								Save cost for you and family
							</h3>

							<p>
								Sit down as a family and discuss your income,
								expenses, and savings goals. This helps everyone
								understand where the money is going and
								encourages responsible spending.
							</p>
						</div>
					</div>

					<SectionImg img={illustrationImg} altText="illustration" />
				</div>

				<div className="feature container col-12 noPad flex">
					<div className="noPad flex flexCenter col-6">
						<div className="txtContain">
							<p>
								<span> Use anytime </span>
							</p>
							<h3 className="secTitle">
								Use anytime when you need
							</h3>

							<p>
								Our service is designed to be available whenever
								you need it. Whether it’s day or night, weekday
								or weekend, you can rely on us to be there for
								you.
							</p>
						</div>
					</div>

					<SectionImg
						img={rideIllustrationImg}
						altText="illustration"
					/>
				</div>
			</div>
		</>
	);
}

export default Features