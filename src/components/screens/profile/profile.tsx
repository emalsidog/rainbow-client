// Dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Actions
import {
	getDisplayedUserByIdRequest,
	setIsFetchingDisplayedUser,
} from "../../../redux/user/actions";

// Selectors
import {
	selectIsCurrentUser,
	selectUsersIsLoading,
	selectUser,
	selectDisplayedUser
} from "../../../redux/user/selector";
import {
	selectPosts,
	selectDisplayedUserPosts,
	selectIsPostsLoading,
} from "../../../redux/posts/selectors";

// Utils
import { formatDate } from "../../utils/format-date";

// Hooks
import { useFriendshipStatus } from "../../../hocs/useFriendshipStatus";
import { useOnlineStatus } from "../../../hocs/useOnlineStatus";

// Styles
import styles from "./profile.module.css";

// Components
import Layout from "../../common/layout";
import Spinner from "../../common/spinners/cirlce";

import PostForm from "./profile-components/post-form";
import DisplayPosts from "./profile-components/display-posts";
import AdditionalInfo from "./profile-components/additional-info";
import DisplayActions from "../../common-actions/display-actions";
import DisplayAccountType from "../../common/display-account-type";

import ProfileSkeleton from "../../skeletons/templates/profile-skeleton";
import MainPhotoSkeleton from "../../skeletons/templates/profile-skeleton/additional/main-photo-skeleton";
import Page404 from "../../common/page-404";

const Profile: React.FC = () => {
	const [is404, setIs404] = useState<boolean>(false);

	const dispatch = useDispatch();

	const displayedUser = useSelector(selectDisplayedUser);
	const currentUser = useSelector(selectUser);

	const isCurrentUser = useSelector(selectIsCurrentUser);
	const isLoadingUsers = useSelector(selectUsersIsLoading);

	const { posts, hasMorePosts } = useSelector(selectPosts);
	const { displayedUserPosts, hasMoreDisplayedUserPosts } = useSelector(selectDisplayedUserPosts);
	const isPostsLoading = useSelector(selectIsPostsLoading);

	const history = useHistory();
	const { profileId }: any = useParams();
	const friendshipStatus = useFriendshipStatus(currentUser, displayedUser);

	const onlineStatus = useOnlineStatus(displayedUser._id);

	useEffect(() => {
		dispatch(getDisplayedUserByIdRequest(profileId));

		return () => {
			dispatch(setIsFetchingDisplayedUser(true));
		};
	}, [dispatch, profileId]);

	useEffect(() => {
		if (!isLoadingUsers.isFetchingUser && !displayedUser._id) {
			setIs404(true);
		}
	}, [isLoadingUsers.isFetchingUser, displayedUser._id]);

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
		accountType,
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

	if (is404) {
		return <Page404 />
	}

	return (
		<Layout>
			<div className="col-7">
				<div className={styles.blocksWrapper}>
					<div
						className={`${styles.wrapper} ${styles.basicInfoBlock}`}
					>
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
											{onlineStatus.status}
										</div>
									)}
								</div>

								<div className={styles.bio}>{bio}</div>
							</div>

							<div className={styles.smallImageBlock}>
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

				<div
					className={`${styles.wrapper} ${styles.upperActionButtons}`}
				>
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
					<PostForm isLoading={isPostsLoading.addPost} />
				) : null}

				<DisplayPosts
					id={_id}
					avatar={avatar}
					givenName={givenName}
					familyName={familyName}
					isCurrentUser={isCurrentUser}
					posts={isCurrentUser ? posts : displayedUserPosts}
					hasMorePosts={
						isCurrentUser ? hasMorePosts : hasMoreDisplayedUserPosts
					}
				/>

				<div className={styles.spinnerBlock}>
					{isPostsLoading.loadingPosts && <Spinner />}
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
