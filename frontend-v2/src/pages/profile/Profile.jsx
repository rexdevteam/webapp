import React from "react";
import { Helmet } from "react-helmet-async";

import { useAuth } from "../../context/AuthContext";

import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";
import LoadingPage from "../../components/ui/LoadingPage";
import ProfileInfo from "./ProfileInfo";
import "./profile.css"

import defProfile from "../../assets/img/avatar.jpg";

const Profile = () => {
	const { user_profile, loading } = useAuth(); 
	console.log(user_profile);

	const linkBtn = <LinkBtn txt={"Edit Profile"} link="/profile/edit" />;

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	if (loading || !user_profile) return <LoadingPage />;

	return (
		<div id="profile">
			<Helmet>
				<title>Profile - Expense Voyage</title>
			</Helmet>

			<PageHead title={"profile"} headBtn={linkBtn} />

			<div className="profile-container">
				<div className="profile-card card">
					<div className="profile-visuals flex flexCenter col-3">
						<div class="profile-pic fitImg">
							<img
								src={user_profile.profile_picture || defProfile}
								alt={user_profile.firstname}
							/>
						</div>

						<div class="user-info">
							<span class="user-name">
								{user_profile.full_name}
							</span>
						</div>
					</div>

					<div className="profile-details col-9">
						<ProfileInfo label="Email" value={user_profile.email} />
						<ProfileInfo label="Phone" value={user_profile.phone} />
						<ProfileInfo
							label="Gender"
							value={user_profile.gender}
						/>
						<ProfileInfo
							label="Date Joined"
							value={formatDate(user_profile.date_joined)}
						/>
						<ProfileInfo
							label="Roles"
							value={user_profile.roles.join(", ")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
