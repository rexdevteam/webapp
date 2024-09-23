import React from "react";

import "../../assets/css/newsletter.css";

const NewsLetter = () => {
	return (
		<>
			<div className="card newsLetterCard col-12">
				<h3 className="secTitle"> Subscribe To Our Newsletter </h3>

				<div className="form-control">
					<input type="text" />
					<div className="btn search-btn">
						<i className="bx bx-right-arrow-alt"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsLetter;
