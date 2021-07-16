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

	isEdited?: boolean;
	timeEdited?: Date;

	isSelected: boolean;
	isInSelectingMode: boolean;
	isDeleteMessageVisible: boolean;
	isSelectedToForward: boolean;

	onClick: () => void;
	handleCopyText: () => void;
	handleDeleteMessage: () => void;
	handleEditMessage: () => void;
	handleSelectMessage: () => void;
	handleForwardMessage: () => void;
}

const Message: React.FC<MessageProps> = (props) => {
	const {
		messageText,
		isRightAligned,
		messageDate,
		isEdited,
		timeEdited,
		isSelected,
		isInSelectingMode,
		isDeleteMessageVisible,
		isSelectedToForward,
		onClick,
		handleCopyText,
		handleDeleteMessage,
		handleEditMessage,
		handleSelectMessage,
		handleForwardMessage,
	} = props;

	const outerRef = useRef<HTMLDivElement | null>(null);

	let classNames: string = `${styles.wrapper} ${
		isSelected ? styles.selected : ""
	} ${isSelectedToForward ? styles.forwardAnim : ""}`;

	return (
		<React.Fragment>
			<ContextMenu outerRef={outerRef}>
				{!isSelected && (
					<ContextMenuItem onClick={handleCopyText}>
						<div>
							<i
								style={{ color: "green" }}
								className="fas fa-copy fa-fw"
							/>
							<span>Copy text</span>
						</div>
					</ContextMenuItem>
				)}
				{isRightAligned && (
					<ContextMenuItem onClick={handleEditMessage}>
						<div>
							<i
								style={{ color: "#17beec" }}
								className="fas fa-edit fa-fw"
							/>
							<span>Edit message</span>
						</div>
					</ContextMenuItem>
				)}
				<ContextMenuItem onClick={handleSelectMessage}>
					<div>
						<i className="fas fa-mouse-pointer fa-fw" />
						<span>
							{isSelected ? "Remove selection" : "Select message"}
						</span>
					</div>
				</ContextMenuItem>
				<ContextMenuItem onClick={handleForwardMessage}>
					<div>
						<i
							style={{ color: "#762ea6" }}
							className="fas fa-share fa-fw"
						/>
						<span>Forward message</span>
					</div>
				</ContextMenuItem>
				{isRightAligned &&
					isDeleteMessageVisible &&
					(!isInSelectingMode || isSelected) && (
						<ContextMenuItem onClick={handleDeleteMessage}>
							<div>
								<i
									style={{ color: "red" }}
									className="fas fa-trash-alt fa-fw"
								/>
								<span>
									{isSelected
										? "Delete selected"
										: "Delete message"}
								</span>
							</div>
						</ContextMenuItem>
					)}
			</ContextMenu>
			<div className={classNames} onClick={onClick} ref={outerRef}>
				{isSelected && (
					<i
						style={{ margin: "0 10px", color: "green" }}
						className="fas fa-check-circle"
					/>
				)}
				<div
					className={`${styles.message} ${
						isRightAligned ? styles.right : ""
					}`}
				>
					<div>{messageText}</div>
					<div className={styles.messageMeta}>
						<span>{isEdited ? "edited" : ""}</span>
						<span>{formatDate(messageDate, "TIME")}</span>
						<div className={styles.extendedTime}>
							<div>{formatDate(messageDate, "FULL_DATE")}</div>
							{isEdited && (
								<div>
									edited:{" "}
									{formatDate(timeEdited, "FULL_DATE")}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Message;
