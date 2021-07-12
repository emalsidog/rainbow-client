// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { searchUsersRequest } from "../../../../redux/users/actions";

// Selectors
import {
	selectHasMoreData,
	selectUsers,
	selectUsersIsLoading,
} from "../../../../redux/users/selectors";

// Hooks
import useDebounce from "../../../../hocs/useDebounce";
import { useIntersectionObserver } from "../../../../hocs/useIntersectionObserver";

// Components
import Layout from "../../../common/layout";
import Spinner from "../../../common/spinners/cirlce";

import FriendCard from "../people-components/people-card";
import InfoPanel from "../people-components/info-panel";
import ActionsPanel from "../people-components/actions-panel";
import SearchPanel from "../people-components/search-panel";
import PeopleSkeleton from "../../../skeletons/templates/people-card-skeleton";

// Styles
import styles from "../people.module.css";

const SearchScreen: React.FC = () => {
	const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<
		boolean | null
	>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [idToDisplay, setIdToDisplay] = useState<string>();
	const [searchValue, setSearchValue] = useState<string>("");

	const { isIntersecting, ref } = useIntersectionObserver();

	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const [hasMoreData, hasMoreSearchedData] = useSelector(selectHasMoreData);
	const isLoading = useSelector(selectUsersIsLoading);

	const debouncedSearchedName = useDebounce<string>(searchValue, 300);
	const oldSearchedValue = useRef<string>("");

	// Handle users fetching without search values
	useEffect(() => {
		if (debouncedSearchedName) return;

		if (hasMoreData) {
			dispatch(
				searchUsersRequest({
					requestOptions: {
						page: pageNumber,
					},
				})
			);
		}
	}, [dispatch, pageNumber, hasMoreData, debouncedSearchedName]);

	// Handle users fetching with search values
	useEffect(() => {
		if (!debouncedSearchedName) return;

		if (
			debouncedSearchedName !== oldSearchedValue.current ||
			hasMoreSearchedData
		) {
			dispatch(
				searchUsersRequest({
					requestOptions: {
						page: pageNumber,
					},
					options: {
						displayName: debouncedSearchedName,
					},
				})
			);

			oldSearchedValue.current = debouncedSearchedName;
		}
	}, [dispatch, pageNumber, debouncedSearchedName, hasMoreSearchedData]);

	useEffect(() => {
		if (isIntersecting) {
			setPageNumber((prev) => prev + 1);
		}
	}, [isIntersecting]);

	/* EVENT HANDLERS */
	const onCloseInfoPanel = (): void => {
		setIsInfoPanelVisible(false);
	};

	const onOpenInfoPanel = (id: string): void => {
		setIdToDisplay(id);
		setIsInfoPanelVisible(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setPageNumber(1);
	};

	/* RENDER CARDS */

	const usersCards = users.map((user, index) => {
		const { _id, givenName, familyName, avatar } = user;
		const payload = { _id, givenName, familyName, avatar };

		if (users.length === index + 1) {
			return (
				<FriendCard
					ref={ref}
					key={_id}
					{...payload}
					openInfoPanel={onOpenInfoPanel}
				/>
			);
		}
		return (
			<FriendCard
				key={_id}
				{...payload}
				openInfoPanel={onOpenInfoPanel}
			/>
		);
	});

	return (
		<Layout overlay={isInfoPanelVisible}>
			<div className="col-10">
				<SearchPanel
					isLoading={isLoading.loading}
					value={searchValue}
					handleChange={handleChange}
				/>

				<section className={styles.cards}>
					{isLoading.isFetchingUsers
						? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
								<PeopleSkeleton key={n} />
						  ))
						: usersCards}
				</section>

				<div className={styles.spinnerBlock}>
					{isLoading.loading && <Spinner />}
				</div>

				<ActionsPanel />
			</div>
			<InfoPanel
				idToDisplay={idToDisplay ? idToDisplay : ""}
				users={users}
				isVisible={isInfoPanelVisible}
				onClose={onCloseInfoPanel}
			/>
		</Layout>
	);
};

export default SearchScreen;
