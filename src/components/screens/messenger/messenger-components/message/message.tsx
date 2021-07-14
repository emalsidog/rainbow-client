// Dependencies
import React, { useRef } from "react";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Styles
import styles from "./message.module.css";

// Components
import ContextMenu, { ContextMenuItem } from "../../../../common/context-menu";

// Types
interface MessageProps {
	messageText: string;
	isRightAligned: boolean;
	messageId: string;
	messageDate: Date;

	handleDeleteMessage: () => void;
}

const Message: React.FC<MessageProps> = (props) => {
	const {
		messageText,
		isRightAligned,
		messageId,
		messageDate,
		handleDeleteMessage,
	} = props;

	const outerRef = useRef<HTMLDivElement | null>(null);

	const handleCopyText = () => {
		navigator.clipboard.writeText(messageText);
	};

	return (
		<React.Fragment>
			<ContextMenu outerRef={outerRef}>
				<ContextMenuItem label="Copy Text" onClick={handleCopyText} />
				{isRightAligned && (
					<ContextMenuItem
						label="Edit Message"
						onClick={() => console.log(messageId)}
					/>
				)}
				{isRightAligned && (
					<ContextMenuItem
						label="Delete Message"
						onClick={handleDeleteMessage}
					/>
				)}
			</ContextMenu>
			<div
				className={`${styles.message} ${
					isRightAligned ? styles.right : ""
				}`}
				ref={outerRef}
			>
				<div>{messageText}</div>
				<div className={styles.timeSend}>
					{formatDate(messageDate, "TIME")}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Message;
