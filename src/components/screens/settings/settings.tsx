// Dependenices
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import {
	selectEmailChangingProcess,
	selectUser,
} from "../../../redux/user/selector";
import { selectIsLoading } from "../../../redux/user/selector";

// Styles
import "./settings.css";

// Components
import Layout from "../../common/layout";
import SectionHeading from "./settings-components/section-heading";

import ChangeName from "./settings-components/change-name";
import ChangeProfileId from "./settings-components/change-profileId";
import ChangeEmail from "./settings-components/change-email";
import ChangePassword from "./settings-components/change-password";
import ChangeAvatar from "./settings-components/change-avatar";
import ChangeBio from "./settings-components/change-bio";
import ChangeBirthday from "./settings-components/change-birthday";

import DeleteAccount from "./settings-components/delete-account";

const Settings: React.FC = () => {
	const user = useSelector(selectUser);
	const emailChangingProcess = useSelector(selectEmailChangingProcess);
	const isLoading = useSelector(selectIsLoading);

	return (
		<Layout>
			<div className="settings-wrapper col-10">
				<SectionHeading
					anchor="personal-info"
					title="Personal info"
					description="Basic information about you, like name and photo"
					displayStyle="DEFAULT"
					isFirst
				/>

				<ChangeName
					isLoading={isLoading.changeName}
					givenName={user.givenName}
					familyName={user.familyName}
				/>

				<ChangeBio isLoading={isLoading.changeBio} bio={user.bio} />

				<ChangeAvatar isLoading={isLoading.changePhoto} />

				<ChangeBirthday
					isLoading={isLoading.changeBirthday}
					birthday={user.birthday}
				/>

				<SectionHeading
					anchor="account-info"
					title="Account info"
					description="Your account data such as profile ID"
					displayStyle="DEFAULT"
				/>

				<ChangeProfileId
					isLoading={isLoading.changeProfileId}
					profileId={user.profileId}
				/>

				<ChangePassword
					lastTimeChanged={user.lastTimeChanged}
					isLoading={isLoading.changePassword}
				/>

				<SectionHeading
					anchor="contact-info"
					title="Contact info"
					description="Your contact info. It can not be seen by other users"
					displayStyle="DEFAULT"
				/>

				<ChangeEmail
					isLoading={isLoading.changeEmail}
					email={user.email}
					emailChangingProcess={emailChangingProcess}
				/>

				<SectionHeading
					anchor="danger-zone"
					title="Danger zone"
					description="Here you are able to do things, that can NOT be fixed. Be careful"
					displayStyle="DANGER"
				/>

				<DeleteAccount isLoading={isLoading.deleteAccount} />
			</div>
		</Layout>
	);
};

export default Settings;
