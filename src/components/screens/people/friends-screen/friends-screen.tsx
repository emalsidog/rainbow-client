// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getPopulatedFriendsRequest } from "../../../../redux/user/actions";

// Selectors
import { selectIsLoading } from "../../../../redux/user/selector";
import { selectFriends } from "../../../../redux/user/selector";

// Hooks
import useDebounce from "../../../../hocs/useDebounce";
import { useIntersectionObserver } from "../../../../hocs/useIntersectionObserver";

// Components
import Layout from "../../../common/layout";
import Spinner from "../../../common/spinner";

import FriendCard from "../people-components/friend-card";
import InfoPanel from "../people-components/info-panel";
import ActionsPanel from "../people-components/actions-panel";
import SearchPanel from "../people-components/search-panel";

// Styles
import styles from "../people.module.css";

const FriendsScreen: React.FC = () => {
	const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<boolean | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [idToDisplay, setIdToDisplay] = useState<string>();
	const [searchValue, setSearchValue] = useState<string>("");

	const { isIntersecting, ref } = useIntersectionObserver();

	const dispatch = useDispatch();
    const [friends, hasMoreData, hasMoreSearchedData] = useSelector(selectFriends);
	const isLoading = useSelector(selectIsLoading);


	const debouncedSearchedName = useDebounce<string>(searchValue, 300);
	const oldSearchedValue = useRef<string>("");

	// Handle users fetching without search values
	useEffect(() => {
		if (debouncedSearchedName) return;
		
		if (hasMoreData) {
			const payload = {
				requestOptions: {
					page: pageNumber
				}
			}
            dispatch(getPopulatedFriendsRequest(payload));
		}
	}, [dispatch, pageNumber, hasMoreData, debouncedSearchedName]);

	// Handle users fetching with search values
	useEffect(() => {
		if (!debouncedSearchedName) return;
		
		if (debouncedSearchedName !== oldSearchedValue.current || hasMoreSearchedData) {
			const payload = {
				requestOptions: {
					page: pageNumber
				},
				options: {
					displayName: debouncedSearchedName
				}
			}
			dispatch(getPopulatedFriendsRequest(payload));

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

	const usersCards = friends.map((user, index) => {
		const { _id, givenName, familyName, avatar } = user;
		const payload = { _id, givenName, familyName, avatar };
     
		if (friends.length === index + 1) {
			return <FriendCard ref={ref} key={_id} {...payload} openInfoPanel={onOpenInfoPanel} />
		}
		return <FriendCard key={_id} {...payload} openInfoPanel={onOpenInfoPanel} />
	});

	return (
		<Layout overlay={isInfoPanelVisible}>
			<div className="col-10">
				<SearchPanel
					isLoading={isLoading.loadingUsers}
					value={searchValue}
					handleChange={handleChange}
				/>

				<section className={styles.cards}>{usersCards}</section>

				<div className={styles.spinnerBlock}>
					{isLoading.loadingUsers && <Spinner />}
				</div>

				<ActionsPanel />
			</div>
			<InfoPanel
				idToDisplay={idToDisplay ? idToDisplay : ""}
                users={friends}
				isVisible={isInfoPanelVisible}
				onClose={onCloseInfoPanel}
			/>
		</Layout>
	);
};

export default FriendsScreen;
