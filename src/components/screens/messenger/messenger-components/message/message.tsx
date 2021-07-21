// Dependencies
import React, { useState, useRef } from "react";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Styles
import styles from "./message.module.css";

// Components
import ContextMenu, { ContextMenuItem } from "../../../../common/context-menu";

// Types
import { ForwardedMessage } from "../../../../../redux/chat/types";

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
	forwardedTo?: ForwardedMessage;
	styleForwarded?: boolean;

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
		forwardedTo,
		styleForwarded = false,
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


	const [timerId, setTimerId] = useState<number>(0);
	const [intervalId, setIntervalId] = useState<number>(0);

	const [offset, setOffset] = useState<number>(0);

	const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const touchPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

	const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
		if (isInSelectingMode) return handleSelectMessage();

		touchStart.current = {
			x: e.changedTouches[0].clientX,
			y: e.changedTouches[0].clientY,
		};
		touchPosition.current = {
			x: touchStart.current.x,
			y: touchStart.current.y,
		};

		const intervalId = window.setInterval(() => {
			const difference: number = touchPosition.current.x - touchStart.current.x;

			if (difference > 0) return;
			

			if (difference > -150) {				
				setOffset(difference);
			}
		}, 10);

		setIntervalId(intervalId);

		const id = window.setTimeout(() => {

			const isXEqual: boolean = touchPosition.current.x === touchStart.current.x;
			const isYEqual: boolean = touchPosition.current.y === touchStart.current.y;

			if (isXEqual && isYEqual) {
				handleSelectMessage();
			}

		}, 700);

		setTimerId(id);
	};

	const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		touchPosition.current = {
			x: e.changedTouches[0].clientX,
			y: e.changedTouches[0].clientY,
		};
	};

	const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
		e.preventDefault();

		timerId && clearTimeout(timerId);
		intervalId && clearInterval(intervalId);
		setOffset(0);

		if (isInSelectingMode) return;

		const sensitivity = 50;

		const x = touchStart.current!.x - touchPosition.current!.x;
		const y = touchStart.current!.y - touchPosition.current!.y;

		if (Math.abs(x) > Math.abs(y)) {
			if (Math.abs(x) > sensitivity) {
				if (x > 0) {
					handleForwardMessage();
				}
			}
		}
	};

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
						<span>
							{isSelected
								? "Forward selected"
								: "Forward message"}
						</span>
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
			<div
				className={classNames}
				onClick={onClick}
				onDoubleClick={handleForwardMessage}
				ref={outerRef}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
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
					style={{
						transform: `translate(${offset}px)` 
					}}
				>
					{forwardedTo && !styleForwarded && (
						<div className={styles.singleForwarded}>
							<div>{forwardedTo.sender?.givenName}</div>
							<div>{forwardedTo.message.text}</div>
						</div>
					)}

					{forwardedTo && styleForwarded && (
						<div className={styles.styleForwarded}>
							Forwarded from {forwardedTo.sender?.givenName}
						</div>
					)}

					<div>
						{styleForwarded
							? forwardedTo?.message.text
							: messageText}
					</div>

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
