// Dependencies
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { searchUserRequest } from "../../../redux/users/actions";

// Selectors
import {
	selectTotalUsers,
	selectUsers,
} from "../../../redux/users/selectors";
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
	const [isInfoPanelVisible, setIsInfoPanelVisible] =
		useState<boolean | null>(null);

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
	const [pageNumber, setPageNumber] = useState<number>(1);

	const debouncedValue = useDebounce<string>(searchValue, 300);

	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const totalUsers = useSelector(selectTotalUsers);

	useEffect(() => {	
		if (users.length !== totalUsers) {
			dispatch(searchUserRequest({ requestOptions: { page: pageNumber } }));
		}
	}, [pageNumber, dispatch]);

	const callback = useCallback((entries) => {
		if (entries[0].isIntersecting) {
			setPageNumber(prev => prev + 1);
		}
	}, []);

	const ref = useCallback((node) => {
			if (!node) return;
			const obsrver = new IntersectionObserver(callback);
			obsrver.observe(node);
		},
		[callback]
	);

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
					<span>
						<i className="fas fa-search"></i>
					</span>
					<input
						value={searchValue}
						onChange={handleSearchChange}
						placeholder="Search by name..."
					/>
				</div>

				<section className={styles.cards}>
					{users.map((user, index) => {
						const { _id, givenName, familyName, avatar } = user;
						if (users.length === index + 1) {
							return (
								<FriendCard
									ref={ref}
									key={_id}
									_id={_id}
									givenName={givenName}
									familyName={familyName}
									avatar={avatar}
									openInfoPanel={onOpenInfoPanel}
								/>
							);
						}
						return (
							<FriendCard
								key={_id}
								_id={_id}
								givenName={givenName}
								familyName={familyName}
								avatar={avatar}
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
