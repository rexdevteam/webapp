import React from 'react'
import PropTypes from "prop-types";

const TripInfo = ({ label, value }) => {
    return (
		<div className="trip-info">
			<span className="label">{label}</span>
			<span>{value || "N/A"}</span>
		</div>
	);
}

TripInfo.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TripInfo
