// Dependencies
import React, { useState } from "react";

// Styles
import styles from "./post.module.css";

// Components
import Dropdown, { DropdownItem } from "../../../../common/dropdown";
import { PostType } from "../../../../../redux/common-types";
import { formatDate } from "../../../../utils/format-date";

// Types
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

	const handleEditMode = () => {
		setIsEditing((prev) => !prev);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

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
						/>
						<DropdownItem
							onClick={() => console.log(postId)}
							title="Delete"
						/>
					</Dropdown>
				) : null}
			</div>

			<div className={styles.postBody}>
				{isEditing ? (
					<div>
						<textarea className="textarea" value="Post text test" />
					</div>
				) : (
					<div>{postText}</div>
				)}
			</div>

			<hr />

			<div className={styles.postFooter}>
				{isEditing ? (
					<div className={styles.postControls}>
						<button className="btn btn-primary">Save</button>
						<button
							onClick={handleCancel}
							className="btn btn-secondary"
						>
							Cancel
						</button>
					</div>
				) : (
					<div>Rainbow</div>
				)}
				{isCurrentUser && <div>{isPublic ? "Public" : "Private"}</div>}
			</div>
		</React.Fragment>
	);
};

export default Post;
