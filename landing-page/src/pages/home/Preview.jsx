import React from 'react'
import "./css/preview.css";
import dashboardImg from "../../assets/img/dashboard.png";

const Preview = () => {
    return (
		<>
			<div className="preview-body flex fitImg">
				<div className="preview-img">
					<img src={dashboardImg} alt="dashboard screenshot" />
				</div>
			</div>
		</>
	);
}

export default Preview