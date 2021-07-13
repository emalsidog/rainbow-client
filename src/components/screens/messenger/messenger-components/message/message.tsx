// Dependencies
import React, { useRef } from "react";

// Styles
import styles from "./message.module.css";

// Components
import ContextMenu, { ContextMenuItem } from "../../../../common/context-menu";

// Types
interface MessageProps {
	messageText: string;
	isRightAligned: boolean;
	messageId: string;
}

const Message: React.FC<MessageProps> = (props) => {
	const { messageText, isRightAligned, messageId } = props;

	const outerRef = useRef<HTMLDivElement | null>(null);

	return (
		<React.Fragment>
			<ContextMenu outerRef={outerRef}>
				<ContextMenuItem
					label="Delete"
					onClick={() => console.log(messageId)}
				/>
				<ContextMenuItem
					label="Edit"
					onClick={() => console.log(messageId)}
				/>
			</ContextMenu>
			<div
				className={`${styles.message} ${
					isRightAligned ? styles.right : ""
				}`}
				ref={outerRef}
			>
				{messageText}
			</div>
		</React.Fragment>
	);
};

export default Message;
