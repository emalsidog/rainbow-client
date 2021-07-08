// Dependencies
import React from "react";

// Styles
import styles from "./display-dialog.module.css";

// Types
interface DisplayDialogProps {
	chatId: string;
	avatar: string;
	givenName: string;
	familyName: string;

	lastMessage: string | undefined;

	handleDialogClick: (chatId: string) => void;

	isActive: boolean;
}

const DisplayDialog: React.FC<DisplayDialogProps> = (props) => {
	const {
		chatId,
		avatar,
		givenName,
		familyName,
		lastMessage,
		handleDialogClick,
		isActive,
	} = props;

	let lastMessageFormatted = lastMessage;

	if (lastMessage && lastMessage.length > 25) {
		lastMessageFormatted = lastMessage.slice(0, 25) + "...";
	}

	return (
		<div
			onClick={() => handleDialogClick(chatId)}
			className={`${styles.wrapper} ${isActive ? styles.active : ""}`}
		>
			<div className={styles.imageContainer}>
				<img alt="" src={avatar} />
			</div>
			<div>
				<div>{`${givenName} ${familyName}`}</div>
				<span className={styles.lastMessage}>
					{lastMessageFormatted}
				</span>
			</div>
		</div>
	);
};

export default DisplayDialog;
