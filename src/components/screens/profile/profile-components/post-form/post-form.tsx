// Dependenices
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Actions
import { addPostRequest } from "../../../../../redux/posts/actions";

// Styles
import styles from "../../profile.module.css";

// Components
import SelectAccessRights from "../select-access-rights";

// Types
interface PostFormProps {
    isLoading: boolean;
}

const PostForm: React.FC<PostFormProps> = (props) => {
    const { isLoading } = props;

	const [postText, setPostText] = useState<string>("");
	const [isPublic, setIsPublic] = useState<boolean>(true);

    const dispatch = useDispatch();

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPostText(e.target.value);
	};

	const handeFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload = {
			postText,
			isPublic,
		};

		dispatch(addPostRequest(payload));
		setPostText("");
	};

	return (
		<form onSubmit={handeFormSubmit} className={`${styles.wrapper}`}>
			<textarea
				rows={1}
				placeholder="What's new?"
				className="textarea accent"
				onChange={handleTextareaChange}
				value={postText}
				disabled={isLoading}
			/>

			<div className={styles.postControls}>
				<button
					className="btn btn-primary"
					disabled={postText.length === 0 || isLoading}
				>
					{isLoading ? "Posting..." : "Post"}
				</button>

				<SelectAccessRights isPublic={isPublic} isLoading={isLoading} setIsPublic={setIsPublic} />

			</div>
		</form>
	);
};

export default PostForm;