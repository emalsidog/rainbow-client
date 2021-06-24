// Dependencies
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Actions
import { getUserByIdRequest } from "../../../redux/users/actions";

// Selectors
import {
	selectIsCurrentUser,
	selectUser,
} from "../../../redux/users/selectors";
import { selectIsLoading, selectUser as selectCurrentUser } from "../../../redux/user/selector"

// Utils
import { formatDate } from "../../utils/format-date";

// Hooks
import { useFriendshipStatus } from "../../../hocs/useFriendshipStatus";

// Styles
import styles from "./profile.module.css";

// Components
import Layout from "../../common/layout";

import PostForm from "./profile-components/post-form";
import DisplayPosts from "./profile-components/display-posts";
import AdditionalInfo from "./profile-components/additional-info";
import DisplayActions from "../../common-actions/display-actions";

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const displayedUser = useSelector(selectUser);
	const currentUser = useSelector(selectCurrentUser);
	const isCurrentUser = useSelector(selectIsCurrentUser);
	const isLoading = useSelector(selectIsLoading);

	const history = useHistory();

	const friendshipStatus = useFriendshipStatus(currentUser, displayedUser);
	
	useEffect(() => {
		console.log(currentUser);

		console.log(displayedUser);
		
		
	}, [currentUser, displayedUser]);
	
	const { profileId }: any = useParams();

	useEffect(() => {
		dispatch(getUserByIdRequest(profileId));
	}, [dispatch, profileId]);

	const handleEdit = (): void => {
		history.push("/settings");
	};

	const {	_id, givenName, familyName, bio, avatar, birthday, registrationDate, posts } = displayedUser;

	return (
		<Layout>
			<div className="col-7">
				<div className={styles.blocksWrapper}>
					<div
						className={`${styles.wrapper} ${styles.basicInfoBlock}`}
					>
						<div className={styles.nameAndSmallImageWrapper}>
							<div className={styles.nameWrapper}>
								<div className={styles.name}>
									{`${givenName} ${familyName}`}
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

					<div className={`${styles.wrapper} ${styles.mediumImageBlock}`}>
						<img src={avatar} alt="" />
					</div>
				</div>

				{isCurrentUser ? <PostForm isLoading={isLoading.addPost} /> : null}

				<DisplayPosts
					avatar={avatar}
					givenName={givenName}
					familyName={familyName}
					isCurrentUser={isCurrentUser}
					posts={isCurrentUser ? currentUser.posts : posts}
				/>
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
