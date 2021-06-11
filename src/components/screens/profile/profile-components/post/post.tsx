// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
	deletePostRequest,
	editPostRequest,
} from "../../../../../redux/posts/actions";

// Selectors
import { selectIsLoading } from "../../../../../redux/user/selector";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Styles
import styles from "./post.module.css";

// Components
import Dropdown, { DropdownItem } from "../../../../common/dropdown";
import SelectAccessRights from "../select-access-rights";
import Modal from "../../../../common/modal";

// Types
import { PostType } from "../../../../../redux/common-types";

interface PostProps {
	avatar: string;
	authorName: string;
	post: PostType;

	isCurrentUser: boolean | undefined;
}

const Post: React.FC<PostProps> = (props) => {
	const { avatar, authorName, isCurrentUser, post } = props;
	const { postId, postText, isPublic, timePosted } = post;

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedPostText, setEditedPostText] = useState<string>(postText);
	const [editedAccessRight, setEditedAccessRight] = useState<boolean>(isPublic);

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const oldPostText = useRef(postText);
	const oldAccessRights = useRef(isPublic);

	useEffect(() => {
		oldPostText.current = postText;
		oldAccessRights.current = isPublic;
	}, [postText, isPublic]);

	const handleEditMode = () => {
		setIsEditing((prev) => !prev);
	};

	const handleCancel = () => {
		setIsEditing(false);

		setEditedPostText(oldPostText.current);
		setEditedAccessRight(oldAccessRights.current);
	};

	const deletePost = () => {
		postId && dispatch(deletePostRequest(postId));
	};

	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedPostText(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (editedPostText.length === 0) {
			return handleShowModal();
		}

		const payload = {
			postText: editedPostText,
			isPublic: editedAccessRight,
			postId,
		};

		dispatch(editPostRequest(payload));
		setIsEditing(false);
	};

	const handleShowModal = () => {
		setIsModalVisible(true);
	};

	const handleHideModal = () => {
		setIsModalVisible(false);
	};

	const isSavedButtonDisabled =
		(editedPostText === oldPostText.current && editedAccessRight === oldAccessRights.current) || isLoading.editPost;

	return (
		<React.Fragment>
			<div className={styles.postHeader}>
				<div className={styles.postWriter}>
					<div>
						<img src={avatar} alt="" />
					</div>
					<div className={styles.postInfo}>
						<div>{authorName}</div>
						<div>{formatDate(timePosted, "REGULAR")}</div>
					</div>
				</div>

				{isCurrentUser ? (
					<Dropdown>
						<DropdownItem
							onClick={handleEditMode}
							title={isEditing ? "Cancel editing" : "Edit"}
							isLoading={isLoading.deletePost}
						/>
						<DropdownItem
							onClick={deletePost}
							title="Delete"
							isLoading={isLoading.deletePost}
						/>
					</Dropdown>
				) : null}
			</div>

			<div className={styles.postBody}>
				{isEditing ? (
					<form onSubmit={handleSubmit} id="editPostForm">
						<textarea
							autoFocus
							placeholder="Editing..."
							className="textarea"
							value={editedPostText}
							onChange={handleTextAreaChange}
						/>
					</form>
				) : (
					<div>{postText}</div>
				)}
			</div>

			<hr />

			{isEditing ? (
				<div className={styles.postFooter}>
					<div className={styles.postControls}>
						<button
							disabled={isSavedButtonDisabled}
							className="btn btn-primary"
							form="editPostForm"
						>
							Save
						</button>
						<button
							onClick={handleCancel}
							className="btn btn-secondary"
							disabled={isLoading.editPost}
						>
							Cancel
						</button>
					</div>

					<SelectAccessRights
						isLoading={false}
						isPublic={editedAccessRight}
						setIsPublic={setEditedAccessRight}
					/>
				</div>
			) : (
				<div className={styles.postFooter}>
					<div>Rainbow</div>
					{isCurrentUser && (
						<div>{isPublic ? "Public" : "Private"}</div>
					)}
				</div>
			)}

			<Modal
				isVisible={isModalVisible}
				onClose={handleHideModal}
				onOk={deletePost}
				title="Confirmation"
				okText="Delete"
				isLoading={isLoading.deletePost}
			>
				<div>Do you want to delete this post?</div>
			</Modal>
		</React.Fragment>
	);
};

export default Post;
