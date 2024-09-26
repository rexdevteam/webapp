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

                        <p> Tellus lacus morbi sagittis lacus in. Amet nisl at mauris enim accumsan nisi, tincidunt vel. Enim ipsum, amet quis ullamcorper eget ut. </p>
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

                        <p> Tellus lacus morbi sagittis lacus in. Amet nisl at mauris enim accumsan nisi, tincidunt vel. Enim ipsum, amet quis ullamcorper eget ut. </p>
					</div>
				</div>
				
				<SectionImg img={rideIllustrationImg} altText="illustration" />
			</div>
        </div>
		</>
	);
}

export default Features