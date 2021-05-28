// Dependencies
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selector";

// Styles
import "./profile.css";

// Components
import Layout from "../../common/layout";

const Profile: React.FC = () => {
	const user = useSelector(selectUser);

	return <Layout><div>{user.givenName}</div></Layout>;
};

export default Profile;
