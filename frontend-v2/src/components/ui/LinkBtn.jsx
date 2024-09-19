import React from 'react'

const LinkBtn = ({ txt, link = "/" }) => {
    return (
		<>
			<a href={link} className="btn rounded">
				{txt}
			</a>
		</>
	);
}

export default LinkBtn;