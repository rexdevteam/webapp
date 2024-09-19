import React from 'react'

import BlankLayout from '../primary/BlankLayout';

const UnprotectedRoute = ({ element, ...rest }) => (
	<>
		<BlankLayout>{element}</BlankLayout>
	</>
);

export default UnprotectedRoute