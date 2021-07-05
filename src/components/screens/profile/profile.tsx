// Dependencies
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Actions
import {
	getUserByIdRequest,
	setIsFetchingUser,
} from "../../../redux/users/actions";

// Selectors
import {
	selectIsCurrentUser,
	selectUsersIsLoading,
	selectUser,
} from "../../../redux/users/selectors";
import {
	selectIsLoading,
	selectUser as selectCurrentUser,
} from "../../../redux/user/selector";

// Utils
import { formatDate } from "../../utils/format-date";

// Hooks
import { useFriendshipStatus } from "../../../hocs/useFriendshipStatus";

// Styles
import styles from "./profile.module.css";

// Components
import Layout from "../../common/layout";
import Spinner from "../../common/spinner";

import PostForm from "./profile-components/post-form";
import DisplayPosts from "./profile-components/display-posts";
import AdditionalInfo from "./profile-components/additional-info";
import DisplayActions from "../../common-actions/display-actions";
import DisplayAccountType from "../../common/display-account-type";

import ProfileSkeleton from "../../skeletons/templates/profile-skeleton";
import MainPhotoSkeleton from "../../skeletons/templates/profile-skeleton/additional/main-photo-skeleton";

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const displayedUser = useSelector(selectUser);
	const currentUser = useSelector(selectCurrentUser);
	const isCurrentUser = useSelector(selectIsCurrentUser);
	const isLoading = useSelector(selectIsLoading);
	const isLoadingUsers = useSelector(selectUsersIsLoading);

	const history = useHistory();
	const friendshipStatus = useFriendshipStatus(currentUser, displayedUser);
	const { profileId }: any = useParams();

	useEffect(() => {
		dispatch(getUserByIdRequest(profileId));

		return () => {
			dispatch(setIsFetchingUser(true));
		};
	}, [dispatch, profileId]);

	const handleEdit = (): void => {
		history.push("/settings");
	};

	const {
		_id,
		givenName,
		familyName,
		bio,
		avatar,
		birthday,
		registrationDate,
		posts,
		accountType,
		isOnline,
		lastSeenOnline
	} = displayedUser;

	if (isLoadingUsers.isFetchingUser) {
		return (
			<Layout>
				<div className="col-7">
					<ProfileSkeleton />
				</div>
				<div className="col-3">
					<MainPhotoSkeleton />
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="col-7">
				<div className={styles.blocksWrapper}>
					<div className={`${styles.wrapper} ${styles.basicInfoBlock}`} >
						<div className={styles.nameAndSmallImageWrapper}>
							<div className={styles.nameWrapper}>
								<div className={styles.nameContainer}>
									<div className={styles.name}>
										{`${givenName} ${familyName}`}
										<DisplayAccountType
											accountType={accountType}
										/>
									</div>
									{!isCurrentUser && (
										<div className={styles.onlineStatus}>
											{isOnline ? "online" : formatDate(lastSeenOnline, "LAST_SEEN_ONLINE")}
										</div>
									)}
								</div>

								<div className={styles.bio}>{bio}</div>
							</div>

							<div className={styles.smallImageBlock}>
								{!isCurrentUser && (
									<div
										style={{
											background: isOnline
												? "#3ec252"
												: "#c40808",
										}}
										className={styles.onlineCircle}
									/>
								)}
								<img src={avatar} alt="" />
							</div>
						</div>

						<hr />

						<AdditionalInfo
							label="Birthday"
							value={formatDate(birthday, "BIRTHDAY")}
						/>
						<AdditionalInfo
							label="Member since"
							value={formatDate(registrationDate, "REGULAR")}
						/>
					</div>

					<div
						className={`${styles.wrapper} ${styles.mediumImageBlock}`}
					>
						<img src={avatar} alt="" />
					</div>
				</div>

				<div className={`${styles.wrapper} ${styles.upperActionButtons}`}>
					{isCurrentUser ? (
							<button
								className="btn btn-primary"
								onClick={handleEdit}
							>
								Edit
							</button>
						) : (
							<DisplayActions
								displayViewProfileButton={false}
								friendshipStatus={friendshipStatus}
								userId={_id}
								userProfileId={profileId}
							/>
						)}
				</div>

				{isCurrentUser ? (
					<PostForm isLoading={isLoading.addPost} />
				) : null}

				<DisplayPosts
					id={_id}
					avatar={avatar}
					givenName={givenName}
					familyName={familyName}
					isCurrentUser={isCurrentUser}
					posts={isCurrentUser ? currentUser.posts : posts}
				/>

				<div className={styles.spinnerBlock}>
					{isLoadingUsers.loadingPosts && <Spinner />}
				</div>
			</div>

			<div className="col-3">
				<div className={`${styles.wrapper} ${styles.bigImageBlock}`}>
					<img src={avatar} alt="" />
				</div>

				<div className={`${styles.wrapper} ${styles.actionButtons}`}>
					{isCurrentUser ? (
						<button
							className="btn btn-primary"
							onClick={handleEdit}
						>
							Edit
						</button>
					) : (
						<DisplayActions
							displayViewProfileButton={false}
							friendshipStatus={friendshipStatus}
							userId={_id}
							userProfileId={profileId}
						/>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
