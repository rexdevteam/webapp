import React from 'react'
import { Link } from 'react-router-dom';

const LinkBtn = ({ txt, link = "/" }) => {
    return (
		<>
			<Link to={link} className="btn rounded">
				{txt}
			</Link>
		</>
	);
}

export default LinkBtn;