// Dependencies
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { searchUsersRequest } from "../../../redux/users/actions";

// Selectors
import {
	selectHasMoreData,
	selectUsers,
	selectIsLoading,
} from "../../../redux/users/selectors";

// Hooks
import useDebounce from "../../../hocs/useDebounce";

// Components
import Layout from "../../common/layout";
import Spinner from "../../common/spinner";

import FriendCard from "./friends-components/friend-card";
import InfoPanel from "./friends-components/info-panel";
import ActionsPanel from "./friends-components/actions-panel";

// Styles
import styles from "./friends.module.css";

const Friends: React.FC = () => {
	const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<boolean | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [idToDisplay, setIdToDisplay] = useState<string>();
	const [searchValue, setSearchValue] = useState<string>("");
	const [isActionsVisible, setIsActionsVisible] = useState<boolean>(true);
	
	
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const [hasMoreData, hasMoreSearchedData] = useSelector(selectHasMoreData);
	const isLoading = useSelector(selectIsLoading);

	const debouncedSearchedName = useDebounce<string>(searchValue, 300);
	const oldSearchedValue = useRef<string>("");
	const oldScrollValue = useRef<number>(0);

	useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll)
    }, []);

	// Handle users fetching without search values
	useEffect(() => {
		if (debouncedSearchedName) return;

		if (hasMoreData) {
			dispatch(
				searchUsersRequest({
					requestOptions: { 
						page: pageNumber 
					},
				})
			);
		}
	}, [dispatch, pageNumber, hasMoreData, debouncedSearchedName]);

	// Handle users fetching with search values
	useEffect(() => {
		if (!debouncedSearchedName) return;

		if (debouncedSearchedName !== oldSearchedValue.current || hasMoreSearchedData) {
			dispatch(
				searchUsersRequest({
					requestOptions: { 
						page: pageNumber 
					},
					options: {
						displayName: debouncedSearchedName,
					},
				})
			);

			oldSearchedValue.current = debouncedSearchedName;
		}
	}, [dispatch, pageNumber, debouncedSearchedName, hasMoreSearchedData]);

	const callback = useCallback((entries) => {
		if (entries[0].isIntersecting) {
			setPageNumber((prev) => prev + 1);
		}
	}, []);

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setPageNumber(1);
	};

    const handleScroll = (e: Event) => {
		const scroll = document.documentElement.scrollTop;

		if (scroll > oldScrollValue.current) {
			setIsActionsVisible(false);
		} else {
			setIsActionsVisible(true);
		}
		oldScrollValue.current = scroll;
    }

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
				<div className={`input-group ${styles.searchBox}`}>
					<span>
						{isLoading ? (
							<Spinner />
						) : (
							<i className="fas fa-search"></i>
						)}
					</span>
					<input
						value={searchValue}
						onChange={handleChange}
						placeholder="Search by name..."
						autoFocus
					/>
				</div>

				<section className={styles.cards}>{usersCards}</section>

				<div className={styles.spinnerBlock}>
					{isLoading && <Spinner />}
				</div>

				<ActionsPanel isVisible={isActionsVisible} />
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
