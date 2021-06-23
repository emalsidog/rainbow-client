// Dependencies
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
	searchUsersRequest,
} from "../../../redux/users/actions";

// Selectors
import {
	selectHasMoreData,
	selectUsers,
	selectIsLoading,
} from "../../../redux/users/selectors";

// Hooks
// import useDebounce from "../../../hocs/useDebounce";

// Components
import Layout from "../../common/layout";
import Spinner from "../../common/spinner";

import FriendCard from "./friends-components/friend-card";
import InfoPanel from "./friends-components/info-panel";

// Styles
import styles from "./friends.module.css";

const Friends: React.FC = () => {
	const [isInfoPanelVisible, setIsInfoPanelVisible] =	useState<boolean | null>(null);
	// const [searchValue, setSearchValue] = useState<string>("");
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [idToDisplay, setIdToDisplay] = useState<string>();

	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const hasMoreData = useSelector(selectHasMoreData);
	const isLoading = useSelector(selectIsLoading);

	// const debouncedSearchedName = useDebounce<string>(searchValue, 300);
		
	useEffect(() => {
		if (hasMoreData)
			dispatch(
				searchUsersRequest({
					requestOptions: { page: pageNumber },
					needsToBeCleared: pageNumber === 1,
				})
			);
	}, [dispatch, pageNumber, hasMoreData]);
	
	const callback = useCallback(
		(entries) => {
			if (entries[0].isIntersecting) {
				setPageNumber((prev) => prev + 1);
			}
		},
		[]
	);

	const ref = useCallback(
		(node) => {
			if (!node) return;
			const obsrver = new IntersectionObserver(callback);
			obsrver.observe(node);
		},
		[callback]
	);

	/* EVENT HANDLERS */
	const onCloseInfoPanel = (): void => {
		setIsInfoPanelVisible(false);
	};

	const onOpenInfoPanel = (id: string): void => {
		setIdToDisplay(id);
		setIsInfoPanelVisible(true);
	};

	// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
	// 	setPageNumber(1);
	// 	setSearchValue(e.target.value);
	// };

	/* RENDER CARDS */

	const usersCards = users.map((user, index) => {
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
	});

	return (
		<Layout overlay={isInfoPanelVisible}>
			<div className="col-10">
				{/* <div className={`input-group ${styles.searchBox}`}>
					<span>
						<i className="fas fa-search"></i>
					</span>
					<input
						value={searchValue}
						onChange={handleSearchChange}
						placeholder="Search by name..."
					/>
				</div> */}

				<section className={styles.cards}>{usersCards}</section>

				<div className={styles.spinnerBlock}>
					{isLoading && <Spinner />}
				</div>
			</div>
			<InfoPanel
				idToDisplay={idToDisplay ? idToDisplay : ""}
				isVisible={isInfoPanelVisible}
				onClose={onCloseInfoPanel}
			/>
		</Layout>
	);
};

export default Friends;
