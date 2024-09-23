import React from "react";

import avatarIcon1 from "../../assets/icons/avatar-1.svg";
import avatarIcon2 from "../../assets/icons/avatar-2.svg";
import avatarIcon3 from "../../assets/icons/avatar-3.svg";
import avatarIcon4 from "../../assets/icons/avatar-4.svg";
import avatarIcon5 from "../../assets/icons/avatar-5.svg";
import avatarIcon6 from "../../assets/icons/avatar-6.svg";

const ReviewContent = () => {
	return (
		<>
			<div className="noPad flex flexCenter">
				<div className="txtContain">
					<h3 className="secTitle">
						What <span> Our Member’s </span> Saying About Us
					</h3>

					<p>
						{" "}
						The doctors are incredibly knowledgeable and
						compassionate.{" "}
					</p>

					<div className="reviewAvatars flexSB">
						<div className="avatars">
							<span className="avatar fitImg">
								<img src={avatarIcon1} alt="" />
							</span>
							<span className="avatar fitImg">
								<img src={avatarIcon2} alt="" />
							</span>
							<span className="avatar fitImg">
								<img src={avatarIcon3} alt="" />
							</span>
							<span className="avatar fitImg">
								<img src={avatarIcon4} alt="" />
							</span>
							<span className="avatar fitImg">
								<img src={avatarIcon5} alt="" />
							</span>
							<span className="avatar fitImg">
								<img src={avatarIcon6} alt="" />
							</span>
						</div>

						<span> 100+ Reviews </span>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewContent;
