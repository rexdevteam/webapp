import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingData = () => {
	return (
		<div
			className="loading-data flex flexCenter"
			style={{ minHeight: "" }}
		>
			<CircularProgress />
		</div>
	);
};

export default LoadingData;
