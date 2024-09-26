import React from "react";
import "./css/hero.css"
import heroImg from "../../assets/img/work-illustration.png";

const HeroHeader = () => {
	return (
		<>
			<div className="hero-body flex col-6">
				<div className="hero-txt flexCenter">
					<h2>
						Track your Expenses to <span> Save </span> Money
					</h2>
					<p>Helps you to organize your income and expenses</p>

					<div className="hero-cta">
						<a
							className="btn rounded"
							href="https://aptech-akwj-expense-voyage-app.onrender.com/signup"
						>
							Get Started
						</a>
					</div>
				</div>
			</div>

			<div className="fitImg hero-illustration col-6 flex flexCenter">
				<img src={heroImg} alt="hero image" />
			</div>
		</>
	);
};

export default HeroHeader;
