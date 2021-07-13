// Dependencies
import React from "react";

// Hooks
import { useOnlineStatus } from "../../../../../hocs/useOnlineStatus";

// Styles
import styles from "./display-dialog.module.css";

// Types
interface DisplayDialogProps {
	chatId: string;
	avatar: string;
	givenName: string;
	familyName: string;
	participantId: string;

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
		participantId,
		handleDialogClick,
		isActive,
	} = props;

	const onlineStatus = useOnlineStatus(participantId);

	let lastMessageFormatted = lastMessage;

	if (lastMessage && lastMessage.length > 25) {
		lastMessageFormatted = lastMessage.slice(0, 25) + "...";
	}

	let onlineCircleStyle = {
		background: onlineStatus.isOnline ? "#0686ad" : "#818181",
		border: onlineStatus.isOnline
			? "1px solid #0d7f9b"
			: "1px solid #5e5e5e",
	};

	return (
		<div
			onClick={() => handleDialogClick(chatId)}
			className={`${styles.wrapper} ${isActive ? styles.active : ""}`}
		>
			<div className={styles.imageContainer} title={onlineStatus.status}>
				<img alt="" src={avatar} />
				<div
					style={onlineCircleStyle}
					className={styles.onlineCircle}
				/>
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
