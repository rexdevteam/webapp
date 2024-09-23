import React from "react";

import mapImg from "../../assets/img/map.png";

const Footer = () => {
	return (
		<>
			<footer id="footer" className="footer">
				<div className="container col-12">
					<div className="footer-columns">
						<div className="column">
							<h4>E-Sheba</h4>
							<p>
								At E-Sheba, we are committed to advancing
								healthcare through innovation and excellence.
								Our vision for the future of quality health
								includes:
							</p>
							<p>
								We continuously integrate the latest medical
								technologies to provide precise and effective
								treatments.
							</p>

							<div className="social-icons">
								<i className="bx bxl-facebook-circle"></i>
								<i className="bx bxl-instagram-alt"></i>
								<i className="bx bxl-x-twitter"></i>
							</div>
						</div>
						<div className="column">
							<h4>Useful Links</h4>

							<ul>
								<li> About Us </li>
								<li> Privacy Policy </li>
								<li> Our Mission </li>
								<li> Our Team </li>
							</ul>
						</div>
						<div className="column">
							<h4>Address</h4>

							<img src={mapImg} alt="map" />
						</div>
					</div>
					<div className="footer-bottom">
						<p> © 2022 All Right Reserved </p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
