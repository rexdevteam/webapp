import React from "react";
import { Helmet } from "react-helmet-async";

import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";

const Profile = () => {
	const linkBtn = <LinkBtn txt={"Edit Profile"} link="/profile/edit" />;

	return (
		<div id="profile">
			<Helmet>
				<title>Profile - Expense Voyage</title>
			</Helmet>

			<PageHead title={"profile"} headBtn={linkBtn} />
		</div>
	);
}

export default Profile;
