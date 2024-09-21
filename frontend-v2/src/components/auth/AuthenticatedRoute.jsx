import React from "react";

import PrivateRoute from "./PrivateRoute";
import Layout from "../primary/Layout";
import NotificationsProvider from "../../context/NotificationsContext";

const AuthenticatedRoute = ({ element, ...rest }) => (
	<NotificationsProvider>
		<PrivateRoute>
			<Layout>{element}</Layout>
		</PrivateRoute>
	</NotificationsProvider>
);


export default AuthenticatedRoute;
