// Dependencies
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Actions
import { getUserByIdRequest } from "../../../redux/actions/users-actions";

// Selectors
import {
	selectIsCurrentUser,
	selectUser,
	// selectIsLoading,
} from "../../../redux/selectors/users-selectors";

// Utils
import { formatDate, formatBirthday } from "../../utils/format-date";

// Styles
import styles from "./profile.module.css";

// Components
import Layout from "../../common/layout";
import Post from "./profile-components/post";

const Profile: React.FC = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	const user = useSelector(selectUser);
	const isCurrentUser = useSelector(selectIsCurrentUser);
	// const isLoading = useSelector(selectIsLoading);

	const { profileId }: any = useParams();

	useEffect(() => {
		dispatch(getUserByIdRequest(profileId));
	}, [dispatch, profileId]);

	const handleEdit = (): void => {
		history.push("/settings");
	};

	let postsToRender = user.posts;
	if (!isCurrentUser) {
		postsToRender = user.posts.filter((post) => post.isPublic !== false);
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
								<div
									className={styles.name}
								>{`${user.givenName} ${user.familyName}`}</div>
								<div className={styles.bio}>{user.bio}</div>
							</div>

							<div className={styles.smallImageBlock}>
								<img src={user.avatar} alt="" />
							</div>
						</div>

						<hr />

						<div className={styles.additionalInfo}>
							<div>Birthday</div>
							<div>{formatBirthday(user.birthday)}</div>
						</div>
						<div className={styles.additionalInfo}>
							<div>Member since</div>
							<div>{formatDate(user.registrationDate)}</div>
						</div>
					</div>

					<div
						className={`${styles.wrapper} ${styles.mediumImageBlock}`}
					>
						<img src={user.avatar} alt="" />
					</div>
				</div>

				{isCurrentUser ? (
					<div className={`${styles.wrapper}`}>
						<textarea
							rows={1}
							placeholder="What's new?"
							className="textarea"
						></textarea>

						<div className={styles.postControls}>
							<button className="btn btn-primary">Post</button>
							<select className="select">
								<option>Public</option>
								<option>Private</option>
							</select>
						</div>
					</div>
				) : null}

				<div className={styles.wrapper}>
					<div className={styles.sectionHeading}>
						<span>Posts</span>
						<hr />
					</div>
					{postsToRender.length <= 0 ? (
						isCurrentUser ? (
							"You do not have posts"
						) : (
							"User does not have posts"
						)
					) : (
						<Post
							authorName={`${user.givenName} ${user.familyName}`}
							isCurrentUser={isCurrentUser}
							avatar={user.avatar}
							post={postsToRender[0]}
						/>
					)}
				</div>
				{/* Posts */}
			</div>

			<div className="col-3">
				<div className={`${styles.wrapper} ${styles.bigImageBlock}`}>
					<img src={user.avatar} alt="" />
				</div>

				<div className={`${styles.wrapper} ${styles.actionButtons}`}>
					{isCurrentUser ? (
						<button
							style={{ width: "100%" }}
							className="btn btn-primary"
							onClick={handleEdit}
						>
							Edit
						</button>
					) : (
						<button
							style={{ width: "100%" }}
							className="btn btn-primary"
						>
							Add to friends
						</button>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
