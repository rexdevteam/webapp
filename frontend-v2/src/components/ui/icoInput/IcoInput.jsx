import React from 'react'

import "./ico-input.css"

const IcoInput = ({ icon, ...props }) => {
	return (
		<>
			<div class="ico-input">
				<i class="icon"> {icon} </i>
				<input {...props} />
			</div>
		</>
	);
};

export default IcoInput