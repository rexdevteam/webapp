import React from "react";
import Section from "./Section";
import HeroHeader from "../sections/HeroHeader";
import Services from "../sections/Services";
import About from "../sections/About";
import Reviews from "../sections/Reviews";
import Goal from "../sections/Goal";
import NewsLetter from "../sections/NewsLetter";

import "../../assets/css/hero.css"

const Wrapper = () => {
    const heroSection = <HeroHeader key="1"/>;
    const serviceSection = <Services key="1" />;
    const aboutSection = <About key="1" />
    const reviewsSection = <Reviews key="1" />;
    const goalSection = <Goal key="1" />;
    const newsLetterSection = <NewsLetter key="1" />;

    
	return (
		<>
			<section id="wrapper" className="wrapper col-12">
				<Section
					id="hero-header"
					classes="hero flex"
					components={[heroSection]}
				/>

				<Section
					id="services"
					classes="services flex"
					components={[serviceSection]}
				/>

				<Section
					id="about"
					classes="about flex"
					components={[aboutSection]}
				/>

				<Section
					id="reviews"
					classes="reviews flex"
					components={[reviewsSection]}
				/>

				<Section
					id="goal"
					classes="goal flex"
					components={[goalSection]}
				/>

				<Section
					id="newsletter"
					classes="newsletter flex"
					components={[newsLetterSection]}
				/>
			</section>
		</>
	);
};

export default Wrapper;
