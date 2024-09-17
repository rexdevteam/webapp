// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Header from "./components/primary/Header";

const App = () => (
	<Router>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="/about" element={<About />} /> */}
		</Routes>
	</Router>
);

export default App;
