import React from "react";
import PropTypes from "prop-types";

const ProfileInfo = ({ label, value }) => {
	return (
		<div className="profile-info">
			<span className="label">{label}</span>
			<span>{value || "N/A"}</span>
		</div>
	);
};

ProfileInfo.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProfileInfo;
