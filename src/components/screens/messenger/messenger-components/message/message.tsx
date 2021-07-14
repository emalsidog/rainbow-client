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
	messageDate: Date;

	handleDeleteMessage: () => void;
	handleEditMessage: () => void;
}

const Message: React.FC<MessageProps> = (props) => {
	const {
		messageText,
		isRightAligned,
		messageDate,
		handleDeleteMessage,
		handleEditMessage,
	} = props;

	const outerRef = useRef<HTMLDivElement | null>(null);

	const handleCopyText = () => {
		navigator.clipboard.writeText(messageText);
	};

	return (
		<React.Fragment>
			<ContextMenu outerRef={outerRef}>
				<ContextMenuItem onClick={handleCopyText}>
					<div>
						<i
							style={{ color: "green" }}
							className="fas fa-copy fa-fw"
						/>
						<span>Copy Text</span>
					</div>
				</ContextMenuItem>

				{isRightAligned && (
					<ContextMenuItem onClick={handleEditMessage}>
						<div>
							<i
								style={{ color: "#17beec" }}
								className="fas fa-edit fa-fw"
							/>
							<span>Edit Message</span>
						</div>
					</ContextMenuItem>
				)}
				{isRightAligned && (
					<ContextMenuItem onClick={handleDeleteMessage}>
						<div>
							<i
								style={{ color: "red" }}
								className="fas fa-trash-alt fa-fw"
							/>
							<span>Delete Message</span>
						</div>
					</ContextMenuItem>
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
