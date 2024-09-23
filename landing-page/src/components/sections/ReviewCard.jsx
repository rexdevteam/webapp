import React from "react";
import avatarIcon from "../../assets/icons/avatar.png";

const ReviewCard = () => {
	return (
		<>
			<div className="noPad">
				<div className="card reviewCard">
					<div className="cardHead flexSB">
						<div className="user flexSB">
							<div className="userImg fitImg">
								<img src={avatarIcon} alt="avatar" />
							</div>
							<div className="userName">
								<p>Jane Cooper</p>
								<span>12/4/17</span>
							</div>
						</div>
						<div className="rating">
							<i className="bx bxs-star checked"></i>
							<i className="bx bxs-star checked"></i>
							<i className="bx bxs-star checked"></i>
							<i className="bx bxs-star checked"></i>
							<i className="bx bxs-star checked"></i>
						</div>
					</div>

					<div className="cardBody">
						<p>
							{" "}
							The doctors are incredibly knowledgeable
							and compassionate. The modern facilities and
							advanced medical technology made me feel confident
							that I was receiving the best care possible. I
							appreciate the personalized approach they take with
							each patient, making sure my treatment plan was
							tailored to my specific needs. Highly recommend!{" "}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewCard;
