// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getPopulatedFriendRequestsRequest } from "../../../../redux/friends/actions";

// Selectors
import { selectIsLoading } from "../../../../redux/user/selector";
import { selectRequests } from "../../../../redux/user/selector";

// Hooks
import { useIntersectionObserver } from "../../../../hocs/useIntersectionObserver";

// Components
import Layout from "../../../common/layout";
import Spinner from "../../../common/spinners/cirlce";

import FriendCard from "../people-components/people-card";
import InfoPanel from "../people-components/info-panel";
import ActionsPanel from "../people-components/actions-panel";
import EmptyListIndicator from "../people-components/empty-list-indicator";

// Styles
import styles from "../people.module.css";

const RequestScreen: React.FC = () => {
	const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<
		boolean | null
	>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [idToDisplay, setIdToDisplay] = useState<string>();

	const { isIntersecting, ref } = useIntersectionObserver();

	const dispatch = useDispatch();
	const [requests, hasMoreData] = useSelector(selectRequests);
	const isLoading = useSelector(selectIsLoading);

	// Handle users fetching without search values
	useEffect(() => {
		if (hasMoreData) {
			const requestOptions = {
				page: pageNumber,
			};
			dispatch(getPopulatedFriendRequestsRequest(requestOptions));
		}
	}, [dispatch, pageNumber, hasMoreData]);

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

	/* RENDER CARDS */

	const usersCards = requests.map((user, index) => {
		const { _id, givenName, familyName, avatar } = user;
		const payload = { _id, givenName, familyName, avatar };

		if (requests.length === index + 1) {
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
				{usersCards.length > 0 ? (
					<section className={styles.cards}>{usersCards}</section>
				) : (
					<EmptyListIndicator message="Oh... Nobody wants to be friends with you..." />
				)}

				<div className={styles.spinnerBlock}>
					{isLoading.loadingUsers && <Spinner />}
				</div>

				<ActionsPanel />
			</div>
			<InfoPanel
				idToDisplay={idToDisplay ? idToDisplay : ""}
				users={requests}
				isVisible={isInfoPanelVisible}
				onClose={onCloseInfoPanel}
			/>
		</Layout>
	);
};

export default RequestScreen;
