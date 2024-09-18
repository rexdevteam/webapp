import React from 'react'

const PageHead = ({ title, headBtn = "" }) => {
	return (
		<>
			<div className="wrapper-head flex">
				<h1> {title} </h1>
				{headBtn ? (
					headBtn
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default PageHead