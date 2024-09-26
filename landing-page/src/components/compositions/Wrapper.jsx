import React from "react";
import Section from "./Section";

// import "../../assets/css/hero.css";

import HeroHeader from "../../pages/home/HeroHeader";
import Preview from "../../pages/home/Preview";
import Features from "../../pages/home/Features";
import Mission from "../../pages/home/Mission";

const Wrapper = () => {
    const heroSection = <HeroHeader key="1" />;
    const previewSection = <Preview key="1" />;
    const featuresSection = <Features key="1" />;
    const missionSection = <Mission key="1" />;

	return (
		<>
			<section id="wrapper" className="wrapper col-12">
				<Section
					id="hero-header"
					classes="hero flex"
					components={[heroSection]}
				/>

				<Section
					id="preview"
					classes="preview flex"
					components={[previewSection]}
				/>

				<Section
					id="features"
					classes="features flex"
					components={[featuresSection]}
				/>

				<Section
					id="mission"
					classes="mission flex"
					components={[missionSection]}
				/>
			</section>
		</>
	);
};

export default Wrapper;
