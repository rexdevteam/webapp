import React from "react";

import PrivateRoute from "./PrivateRoute";
import Layout from "../primary/Layout";

const AuthenticatedRoute = ({ element, ...rest }) => (
		<>
			{...rest}
			element={
				<PrivateRoute>
					<Layout>{element}</Layout>
				</PrivateRoute>
			}
		</>
);


export default AuthenticatedRoute;
