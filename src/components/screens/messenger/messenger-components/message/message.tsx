// Dependencies
import React from "react";

// Styles
import styles from "./message.module.css";

// Types
interface MessageProps {
	messageText: string;
	isRightAligned: boolean;
}

const Message: React.FC<MessageProps> = (props) => {
	const { messageText, isRightAligned } = props;

	return (
		<div
			className={`${styles.message} ${
				isRightAligned ? styles.right : ""
			}`}
		>
			{messageText}
		</div>
	);
};

export default Message;
