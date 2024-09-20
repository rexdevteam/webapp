import React from 'react'
import { CircularProgress } from "@mui/material";

const Btn = ({ txt, type="submit", isLoading = false, handleClick = () => {}, className="" }) => {
	return (
		<>
			<button
				type={type}
				className={`btn rounded ${className}`}
				disabled={isLoading}
				onClick={handleClick}
			>
				{isLoading ? (
					<CircularProgress size="20px" color="inherit" />
				) : (
					txt
				)}
			</button>
		</>
	);
};

export default Btn
