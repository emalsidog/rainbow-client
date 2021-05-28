// Dependenices
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import {
	selectEmailChangingProcess,
	selectUser,
} from "../../../redux/selectors/user-selector";
import { selectIsLoading } from "../../../redux/selectors/user-selector";

// Styles
import "./settings.css";

// Components
import Layout from "../../common/layout";

import ChangeName from "./settings-components/change-name";
import ChangeProfileId from "./settings-components/change-profileId";
import ChangeEmail from "./settings-components/change-email";

const Settings: React.FC = () => {
	const user = useSelector(selectUser);
	const emailChangingProcess = useSelector(selectEmailChangingProcess);
	const isLoading = useSelector(selectIsLoading);

	return (
		<Layout>
			<div className="settings-wrapper">
				<div className="settings-heading">
					<span>Personal info</span>
					<p>Basic information about you, like name and photo</p>
				</div>

				<ChangeName
					isLoading={isLoading.changeName}
					givenName={user.givenName}
					familyName={user.familyName}
				/>

				<ChangeProfileId
					isLoading={isLoading.changeProfileId}
					profileId={user.profileId}
				/>

				<ChangeEmail
					isLoading={isLoading.changeEmail}
					email={user.email}
					emailChangingProcess={emailChangingProcess}
				/>
			</div>
		</Layout>
	);
};

export default Settings;
