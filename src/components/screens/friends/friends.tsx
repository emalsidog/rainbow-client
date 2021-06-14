// Dependencies
import React, { useState } from "react";

// Components
import Layout from "../../common/layout";

import FriendCard from "./friends-components/friend-card";
import InfoPanel from "./friends-components/info-panel";

// Styles
import styles from "./friends.module.css";

const Friends: React.FC = () => {

	const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<boolean | null>(null);

	const secondSidebarOptions = [
		{
			title: "Search",
			hashLink: false,
			linkTo: "/",
		},
		{
			title: "My friends",
			hashLink: false,
			linkTo: "/",
		},
		{
			title: "Pending",
			hashLink: false,
			linkTo: "/",
		},
	];

	
	const onCloseInfoPanel = (): void => {
		setIsInfoPanelVisible(false);
	}

	const onOpenInfoPanel = (): void => {
		setIsInfoPanelVisible(true);
	}

	return (
		<Layout secondSidebar secondSidebarOptions={secondSidebarOptions} overlay={isInfoPanelVisible}>
			<div className="col-8">
				<div style={{ marginBottom: "1rem" }} className="input-group">
					<span>
						<i className="fas fa-search"></i>
					</span>
					<input placeholder="Search by name..." />
				</div>

				<section className={styles.cards}>
					<FriendCard openInfoPanel={onOpenInfoPanel} />
					<FriendCard openInfoPanel={onOpenInfoPanel} />
					<FriendCard openInfoPanel={onOpenInfoPanel} />
					<FriendCard openInfoPanel={onOpenInfoPanel} />
				</section>
			</div>
			<InfoPanel isVisible={isInfoPanelVisible} onClose={onCloseInfoPanel} />
		</Layout>
	);
};

export default Friends;
