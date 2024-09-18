import React from 'react'

const PageHead = ({ title, altText = "" }) => {
	return (
		<>
			<div className="wrapper-head flex">
				<h1> {title} </h1>
				<a href="" className="btn rounded">
					{" "}
					Create New Trip{" "}
				</a>
			</div>
		</>
	);
};

export default PageHead