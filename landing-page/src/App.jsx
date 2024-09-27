import { useState } from "react";

// components
import Header from "./components/compositions/Header";
import Wrapper from "./components/compositions/Wrapper";
import Footer from "./components/compositions/Footer";

// styles
import "./assets/css/zeddy_styles.css";
import "./assets/css/styles.css";

function App() {
	
	return (
		<>
			<Header />
			<Wrapper />
			<Footer />
		</>
	);
}

export default App;
