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
import SectionHeading from "./settings-components/section-heading";

import ChangeName from "./settings-components/change-name";
import ChangeProfileId from "./settings-components/change-profileId";
import ChangeEmail from "./settings-components/change-email";
import DeleteAccount from "./settings-components/delete-account";

const Settings: React.FC = () => {
	const user = useSelector(selectUser);
	const emailChangingProcess = useSelector(selectEmailChangingProcess);
	const isLoading = useSelector(selectIsLoading);

	const secondSidebarOptions = [
		{
			title: "Personal info",
			linkTo: "#personal-info",
			hashLink: true,
		},
		{
			title: "Danger zone",
			linkTo: "#danger-zone",
			hashLink: true,
		},
	];

	return (
		<Layout secondSidebar secondSidebarOptions={secondSidebarOptions}>
			<div className="settings-wrapper">
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

				<ChangeProfileId
					isLoading={isLoading.changeProfileId}
					profileId={user.profileId}
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
