import React from 'react'
import { CircularProgress } from "@mui/material";

const LoadingPage = () => {
    return (
		<div className="loading-page flex flexCenter" style={{ minHeight: "80vh" }}>
			<CircularProgress />
		</div>
	);
}

export default LoadingPage