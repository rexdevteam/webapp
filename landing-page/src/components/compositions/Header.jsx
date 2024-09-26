import React, { useEffect, useState } from "react";
import "../../assets/css/header.css";

const Header = () => {
    const [headerBg, setHeaderBg] = useState("transparent");

    const handleScroll = () => {
		if (window.scrollY > 50) {
			setHeaderBg("white");
		} else {
			setHeaderBg("transparent");
		}
	};

    useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

    return (
		<>
			<header id="header" className={`headerBg ${headerBg}`}>
				<div className="header-c">
					<div className="logo">
						<a href="">
							<h1>
								Expense<span>Voyage</span>
							</h1>
						</a>
					</div>

					<div className="menu flex flexCenter">
						<nav>
							<a href="#hero-header"> Home </a>
							<a href="#features"> Features </a>
							<a href="#about"> About </a>
							<a href="#mission"> Mission </a>
						</nav>
					</div>

					<div className="actionBtns flex flexCenter">
						<a href="https://aptech-akwj-expense-voyage-app.onrender.com/login">
							<span className="btn rounded plainBtn">Log in</span>
						</a>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header