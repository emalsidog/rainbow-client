// Dependencies
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Actions
import { getUserByIdRequest } from "../../../redux/actions/users-actions";

// Selectors
import {
	selectIsCurrentUser,
	selectUser,
	selectIsLoading,
} from "../../../redux/selectors/users-selectors";

// Utils
import { formatDate, formatBirthday } from "../../utils/format-date";

// Styles
import "./profile.css";

// Components
import Layout from "../../common/layout";

const Profile: React.FC = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const isCurrentUser = useSelector(selectIsCurrentUser);
	const isLoading = useSelector(selectIsLoading);

	const { profileId }: any = useParams();

	useEffect(() => {
		dispatch(getUserByIdRequest(profileId));
	}, [dispatch, profileId]);

	return (
		<Layout>
			<ul>
				<img src={user.avatar} style={{ width: "100px" }} alt={user.givenName} />
				<li>{user.givenName}</li>
				<li>{user.familyName}</li>
				<li>{formatDate(user.registrationDate)}</li>
				<li>{user.bio}</li>
				<li>{formatBirthday(user.birthday)}</li>
				<div>Current user: {isCurrentUser ? "true" : "false"}</div>
				<div>Loading: {isLoading ? "true" : "false"}</div>
			</ul>
		</Layout>
	);
};

export default Profile;
