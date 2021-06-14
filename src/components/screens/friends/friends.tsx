// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { searchUserRequest } from "../../../redux/users/actions";

// Selectors
import { selectUsers } from "../../../redux/users/selectors";
import { User } from "../../../redux/users/types";

// Hooks
import useDebounce from "../../../hocs/useDebounce";

// Components
import Layout from "../../common/layout";

import FriendCard from "./friends-components/friend-card";
import InfoPanel from "./friends-components/info-panel";

// Styles
import styles from "./friends.module.css";

const Friends: React.FC = () => {
	const [isInfoPanelVisible, setIsInfoPanelVisible] =	useState<boolean | null>(null);

	const [userToDisplay, setUserToDisplay] = useState<User>({
		givenName: "",
		familyName: "",
		bio: "",
		avatar: "",
		_id: "",
		profileId: "",
		registrationDate: undefined,
		birthday: undefined,
		posts: [],
	});

	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(searchValue, 300);

	const dispatch = useDispatch();
	const users = useSelector(selectUsers);

	useEffect(() => {
		if (!debouncedValue) return;
		dispatch(searchUserRequest({ displayName: debouncedValue }));
	}, [debouncedValue, dispatch]);

	const onCloseInfoPanel = (): void => {
		setIsInfoPanelVisible(false);
	};

	const onOpenInfoPanel = (id: string): void => {
		const user = users.find((user) => id === user._id);
		user && setUserToDisplay(user);
		setIsInfoPanelVisible(true);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(e.target.value);
	};

	return (
		<Layout overlay={isInfoPanelVisible}>
			<div className="col-10">
				<div className={`input-group ${styles.searchBox}`}>
					<span><i className="fas fa-search"></i></span>
					<input
						value={searchValue}
						onChange={handleSearchChange}
						placeholder="Search by name..."
					/>
				</div>

				<section className={styles.cards}>
					{users.map((user) => {
						return (
							<FriendCard
								key={user._id}
								_id={user._id}
								givenName={user.givenName}
								familyName={user.familyName}
								avatar={user.avatar}
								openInfoPanel={onOpenInfoPanel}
							/>
						);
					})}
				</section>
			</div>
			<InfoPanel
				user={userToDisplay}
				isVisible={isInfoPanelVisible}
				onClose={onCloseInfoPanel}
			/>
		</Layout>
	);
};

export default Friends;
