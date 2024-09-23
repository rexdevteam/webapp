import React from "react";
import ReviewContent from "./ReviewContent";
import ReviewCard from "./ReviewCard";

import "../../assets/css/reviews.css";

const Reviews = () => {
	return (
		<>
			<div className="container col-12 noPad flex flexCenter row">
				<ReviewContent />
				<ReviewCard />
			</div>
		</>
	);
};

export default Reviews;
