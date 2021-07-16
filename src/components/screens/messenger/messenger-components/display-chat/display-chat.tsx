// Dependencies
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Websocket connection
import { websocket } from "../../../../../redux/websockets/saga";

// Actions
import {
	addMessageRequest,
	deleteMessage,
	editMessage,
} from "../../../../../redux/chat/actions";

// Hooks
import { useOnlineStatus } from "../../../../../hocs/useOnlineStatus";

// Styles
import styles from "./display-chat.module.css";

// Components
import Textarea from "../../../../common/textarea";
import Message from "../message";
import ThreeDots from "../../../../common/spinners/three-dots";

// Types
import {
	Chat,
	ChatProcesses,
	Message as MessageType,
} from "../../../../../redux/chat/types";
import { TextAreaOptions } from "../../../../common/textarea/textarea";
import { formatDate } from "../../../../utils/format-date";

interface DisplayChatProps {
	chat: Chat;
	currentUserId: string;
	currentUserProfileId: string;

	onGoBack: () => void;
}

interface WebsocketPayload {
	type: string;
	payload: {
		process?: ChatProcesses;
		chatId: string;
		chatParticipantsIds: string[];
		whoInAction: string;
	};
}

const DisplayChat: React.FC<DisplayChatProps> = (props) => {
	const { chat, currentUserId, currentUserProfileId, onGoBack } = props;

	/*
	 *	Editing states.
	 *	isEditing - shows if user is in editing mode.
	 *	messageToEdit - stores messages, which user is currentlu editing.
	 */
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [messageToEdit, setMessageToEdit] = useState<MessageType | null>(
		null
	);

	/*
	 *	Selecting states.
	 *	isSelecting - shows if user is in selecting mode.
	 *	selectedMessages - stores messages, that were selected by user.
	 */
	const [isSelecting, setIsSelecting] = useState<boolean>(false);
	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

	/*
	 *	Forwarding states.
	 */
	const [isForwarding, setIsForwarding] = useState<boolean>(false);
	const [messageToForward, setMessageToForward] =
		useState<MessageType | null>(null);
	const index = useRef<number>(chat.messages.length);

	// ------- Textarea configuration.
	const [textareaOptions, setTextareaOptions] = useState<TextAreaOptions>({
		rows: 1,
		minRows: 1,
		maxRows: 10,
		charactersLimit: 500,
		value: "",
	});

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// Handle keyboard events in textarea
	const handleTextAreaKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	): void => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (isEditing) {
				return saveEditedMessage();
			}
			sendMessage();
		}
	};

	// ------- End of textarea configuration.

	// Dispatch
	const dispatch = useDispatch();

	/* ======= GET ONLINE STATUS ======= */

	// Get id of interlocutor
	let id: string = chat.creator._id;
	if (currentUserId === id) {
		id = chat.participants[0]._id;
	}

	// Getting onlineStatus of interlocutor
	const onlineStatus = useOnlineStatus(id);

	/* ======= END OF GET ONLINE STATUS ======= */

	// Get last div which is last message.
	const messagesDiv = useRef<HTMLDivElement>(null);

	// Helper. Scroll to bottom.
	const scrollDown = (): void => {
		messagesDiv.current!.scrollTop = messagesDiv.current!.scrollHeight;
	};

	// Scroll to bottom of the chat if last message was updated
	const lastMessage = chat.messages[chat.messages.length - 1];
	useEffect(() => {
		messagesDiv.current && scrollDown();
	}, [lastMessage]);

	// Flag for stopping sending server requests on each changing in textarea.
	const isTyping = useRef<boolean>(false);

	// Helper. Get ids of chat participants
	const getParticipants = useCallback((): string[] => {
		let recipients: string[] = [chat.creator._id];
		let filteredParticipants: string[] = chat.participants
			.filter((participant) => participant._id !== currentUserId)
			.map((filteredParticipant) => filteredParticipant._id);

		recipients = [...recipients, ...filteredParticipants];

		if (chat.creator._id === currentUserId) {
			recipients = chat.participants.map(
				(participant) => participant._id
			);
		}

		return recipients;
	}, [chat.creator._id, chat.participants, currentUserId]);

	// Change chat process (typing...)
	useEffect(() => {
		if (websocket.readyState !== 1) return;

		const chatParticipantsIds = getParticipants();
		const payload: WebsocketPayload = {
			type: "CHANGE_CHAT_PROCESS",
			payload: {
				chatId: chat.chatId,
				chatParticipantsIds,
				whoInAction: currentUserId,
			},
		};

		if (!isTyping.current && textareaOptions.value.length > 0) {
			isTyping.current = true;
			payload.payload.process = "TYPING";
			websocket.send(JSON.stringify(payload));
		}

		if (isTyping && textareaOptions.value.length === 0) {
			isTyping.current = false;
			payload.payload.process = "IDLE";
			websocket.send(JSON.stringify(payload));
		}
	}, [textareaOptions.value, getParticipants, chat.chatId, currentUserId]);

	/* ======= TEXT COPYING ======= */

	// Handle "Copy Text" in context menu
	const handleCopyText = (messageText: string): void => {
		navigator.clipboard.writeText(messageText);
	};

	/* ======= END OF TEXT COPYING ======= */

	/* ======= MESSAGE SENDING ======= */

	// Send message.
	const sendMessage = (): void => {
		if (textareaOptions.value.trim().length <= 0) return;

		const recipients = getParticipants();

		const payload = {
			message: {
				text: textareaOptions.value.trim(),
				time: new Date(),
				sender: currentUserId,
				chatId: chat.chatId,
				messageId: uuidv4(),
			},
			recipients,
		};

		websocket.send(
			JSON.stringify({
				type: "ADD_MESSAGE",
				payload,
			})
		);
		dispatch(addMessageRequest(payload.message));

		setTextareaOptions((prev) => ({
			...prev,
			rows: 1,
			value: "",
		}));

		textAreaRef.current?.focus();
	};

	// Handle form submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (isEditing) {
			return saveEditedMessage();
		}
		sendMessage();
	};

	/* ======= MESSAGE DELETING ======= */

	// Handle "Delete Message" in context menu.
	const handleDeleteMessage = (messageId: string) => {
		if (!isDeleteMessageVisible) return;

		const recipients = getParticipants();

		let messagesToDelete: string[] = [];

		if (selectedMessages.length > 0) {
			messagesToDelete = [...selectedMessages];
		} else {
			messagesToDelete = [messageId];
		}

		const payload = {
			messageData: {
				messagesToDelete,
				chatId: chat.chatId,
			},
			recipients,
		};

		websocket.send(
			JSON.stringify({
				type: "DELETE_MESSAGE",
				payload,
			})
		);

		dispatch(deleteMessage(payload.messageData));

		setIsSelecting(false);
	};

	/* ======= END OF MESSAGE DELETING ======= */

	/* ======= MESSAGE SELECTING ======= */
	const [isDeleteMessageVisible, setIsDeleteMessageVisible] =
		useState<boolean>(true);

	useEffect(() => {
		if (selectedMessages.length <= 0) return;

		const { messages } = chat;

		const interlocutorMessages = messages.filter((message) => {
			const isCurrentUserSender = message.sender === currentUserId;

			const isInSelectedMessages = selectedMessages.includes(
				message.messageId
			);

			if (!isCurrentUserSender && isInSelectedMessages) {
				return true;
			}
			return false;
		});

		if (interlocutorMessages.length > 0) {
			setIsDeleteMessageVisible(false);
		} else {
			setIsDeleteMessageVisible(true);
		}
	}, [selectedMessages, chat, currentUserId]);

	// Handle "Select Message" or "Remove Selection" in context menu
	const handleSelectMessage = (messageId: string): void => {
		selectedMessages.length >= 0
			? setIsSelecting(true)
			: setIsSelecting(false);

		setIsForwarding(false);
		setMessageToForward(null);

		moveMessage(messageId);
	};

	// Handle click on message
	const onMessageClick = (messageId: string): void => {
		isSelecting && moveMessage(messageId);
	};

	// Helper. Add or remove message from the selected messages
	const moveMessage = (messageId: string): void => {
		const isSelected = selectedMessages.includes(messageId);
		if (!isSelected) {
			setSelectedMessages((prev) => [...prev, messageId]);
		} else {
			setSelectedMessages((prev) =>
				prev.filter((id) => id !== messageId)
			);
		}
	};

	// Helper. Disable selection mode. Remove all selected items.
	const removeSelection = (): void => {
		setIsSelecting(false);
		setSelectedMessages([]);
	};

	// Disable selection mode (isSelecting = false) if there are no selected items
	useEffect(() => {
		if (selectedMessages.length <= 0) {
			setIsSelecting(false);
		}
	}, [selectedMessages]);

	/* ======= END OF MESSAGE SELECTING ======= */

	/* ======= MESSAGE FORWARDING ======= */

	// Handle "Forward message" in context menu.
	const handleForwardMessage = useCallback(
		(messageId: string): void => {
			const messageToForward = chat.messages.find(
				(message) => message.messageId === messageId
			);
			if (!messageToForward) return;

			isEditing && handleStopEditing();

			if (isSelecting) {
				setIsForwarding(true);
				setIsSelecting(false);
				textAreaRef.current?.focus();
				scrollDown();
				return;
			}

			setMessageToForward(messageToForward);

			setIsForwarding(true);
			textAreaRef.current?.focus();
			scrollDown();
		},
		[chat.messages, isEditing, isSelecting]
	);

	// Handle stop forwarding
	const handleStopForwarding = useCallback((): void => {
		setIsForwarding(false);
		setMessageToForward(null);
		setSelectedMessages([]);
		index.current = chat.messages.length;
	}, [chat.messages.length]);

	/* ======= END OF MESSAGE FORWARDING ======= */

	/* ======= MESSAGE EDITING ======= */

	// If message, which is being editing was deleted - stop editing mode
	useEffect(() => {
		if (isEditing) {
			const isMatch = chat.messages.some(
				(message) => message.messageId === messageToEdit?.messageId
			);
			!isMatch && handleStopEditing();
		}
	}, [chat.messages, isEditing, messageToEdit?.messageId]);

	// Handle "Edit Message" in context menu
	const handleEditMessage = useCallback(
		(messageId: string): void => {
			const messageToEdit = chat.messages.find(
				(message) => message.messageId === messageId
			);
			if (!messageToEdit) return;

			isForwarding && handleStopForwarding();

			isSelecting && removeSelection();

			setMessageToEdit(messageToEdit);
			setTextareaOptions((prev) => ({
				...prev,
				value: messageToEdit.text,
			}));
			setIsEditing(true);

			setTextareaOptions((prev) => ({ ...prev, rows: 3 }));

			textAreaRef.current?.focus();
			scrollDown();
		},
		[chat.messages, isSelecting, isForwarding, handleStopForwarding]
	);

	// Helper. Call it, when you want to stop editing process
	const handleStopEditing = (): void => {
		setTextareaOptions((prev) => ({ ...prev, value: "" }));
		setIsEditing(false);
		setMessageToEdit(null);
		setTextareaOptions((prev) => ({ ...prev, rows: 1 }));
	};

	// Save message after editing.
	const saveEditedMessage = (): void => {
		const newText = textareaOptions.value.trim();

		const isMatch: boolean = messageToEdit?.text === newText;

		if (isMatch) {
			return handleStopEditing();
		}

		if (newText.length <= 0) return;

		const recipients = getParticipants();

		const payload = {
			data: {
				meta: {
					messageId: messageToEdit!.messageId,
					chatId: chat.chatId,
				},
				updatedMessageFields: {
					text: newText,
					dateEdited: new Date(),
				},
			},
			recipients,
		};

		websocket.send(
			JSON.stringify({
				type: "EDIT_MESSAGE",
				payload,
			})
		);

		dispatch(editMessage(payload.data));

		handleStopEditing();
	};

	/* ======= END OF MESSAGE EDITING ======= */

	/*
	 *	Handle keyboard pressing.
	 *	Escape - stop editing process.
	 *	ArrowUp - start editing last sent message.
	 */
	const handleEditingKeyDown = useCallback(
		(e: any): void => {
			if (e.ctrlKey && e.key === "ArrowUp") {
				index.current = index.current - 1;

				if (index.current === 0) {
					handleForwardMessage(
						chat.messages[index.current].messageId
					);

					// removeSelection();

					index.current = chat.messages.length;
					return;
				}
				handleForwardMessage(chat.messages[index.current].messageId);
				// removeSelection();
				return;
			}

			if (e.ctrlKey && e.key === "ArrowDown") {
				index.current = index.current + 1;
				if (index.current === chat.messages.length) {
					index.current = 0;
				}
				handleForwardMessage(chat.messages[index.current].messageId);
				removeSelection();
			}

			switch (e.key) {
				case "Escape":
					isEditing && handleStopEditing();
					isForwarding && handleStopForwarding();
					break;

				case "ArrowUp":
					if (!isEditing) {
						e.preventDefault();

						for (let i = chat.messages.length - 1; i >= 0; i--) {
							if (chat.messages[i].sender === currentUserId) {
								return handleEditMessage(
									chat.messages[i].messageId
								);
							}
						}
					}
					break;
			}
		},
		[
			chat.messages,
			isEditing,
			currentUserId,
			isForwarding,
			handleEditMessage,
			handleForwardMessage,
			handleStopForwarding,
		]
	);

	// Add and remove listeners on mounting and unmounting.
	useEffect(() => {
		document.addEventListener("keydown", handleEditingKeyDown);
		return () => {
			document.removeEventListener("keydown", handleEditingKeyDown);
		};
	}, [handleEditingKeyDown]);

	/* ------- Render interlocutor data. */

	let givenName: string;
	let familyName: string;

	if (currentUserProfileId === chat.creator.profileId) {
		givenName = chat.participants[0].givenName;
		familyName = chat.participants[0].familyName;
	} else {
		givenName = chat.creator.givenName;
		familyName = chat.creator.familyName;
	}

	/* ------- End of render interlocutor data. */

	/* ------- Render messages */
	let messages: JSX.Element[] | JSX.Element = [];

	if (chat.messages.length > 0) {
		messages = chat.messages.map((message, index, array) => {
			const { messageId, text, time, sender, isEdited, timeEdited } =
				message;
			const currentMessageDate = new Date(message.time);
			const previousMessageDate = new Date(array[index - 1]?.time);

			const currentMessageDay = currentMessageDate.getDate();
			const previousMessageDay = previousMessageDate.getDate();

			const displayMessagedDate: boolean =
				currentMessageDay - previousMessageDay >= 1;

			let isSelected: boolean = false;
			if (isSelecting) {
				isSelected = selectedMessages.includes(messageId);
			}

			let isSelectedToForward: boolean = false;
			if (messageId === messageToForward?.messageId) {
				isSelectedToForward = true;
			}

			const msg: JSX.Element = (
				<Message
					key={messageId}
					messageText={text}
					isRightAligned={sender === currentUserId}
					messageDate={time}
					isEdited={isEdited}
					timeEdited={timeEdited}
					isSelected={isSelected}
					isInSelectingMode={isSelecting}
					isDeleteMessageVisible={isDeleteMessageVisible}
					isSelectedToForward={isSelectedToForward}
					onClick={() => onMessageClick(messageId)}
					handleCopyText={() => handleCopyText(text)}
					handleDeleteMessage={() => handleDeleteMessage(messageId)}
					handleEditMessage={() => handleEditMessage(messageId)}
					handleSelectMessage={() => handleSelectMessage(messageId)}
					handleForwardMessage={() => handleForwardMessage(messageId)}
				/>
			);

			if (displayMessagedDate || isNaN(previousMessageDay)) {
				return (
					<React.Fragment key={messageId}>
						<div className={styles.messagesDate}>
							{formatDate(currentMessageDate, "REGULAR")}
						</div>
						{msg}
					</React.Fragment>
				);
			}

			return msg;
		});
	} else {
		messages = <div className={styles.sayHiBlock}>Say hi!</div>;
	}

	/* ------- End of render messages. */

	/* ------- Render chat process. */

	let displayChatProcess: JSX.Element | undefined = undefined;

	switch (chat.status.type) {
		case "TYPING":
			displayChatProcess = <ThreeDots loadingText="typing" />;
			break;
		case "IDLE":
			displayChatProcess = <span>{onlineStatus.status}</span>;
			break;
	}

	/* ------- End of render chat process. */

	let additionalPanelHeader: string | undefined = "";
	let additionalPanelContent: string | undefined = "";
	let additionalPanelIcon: JSX.Element | undefined = undefined;

	if (isEditing) {
		additionalPanelHeader = "Edit message";
		additionalPanelContent = messageToEdit?.text;
		additionalPanelIcon = <i className="fas fa-edit" />;
	} else if (isForwarding) {
		// Get all populated participants
		const allParticipants = [chat.creator, ...chat.participants];

		// Set icon
		additionalPanelIcon = <i className="fas fa-share" />;

		// If there are no selected messages = use single messageToForward
		if (selectedMessages.length <= 0) {
			const sender = allParticipants.find(
				(participant) => participant._id === messageToForward?.sender
			);

			additionalPanelHeader = sender?.givenName;
			additionalPanelContent = messageToForward?.text;
		} else {
			// Get populated messages to forward
			const messagesToForward = chat.messages.filter((message) =>
				selectedMessages.includes(message.messageId)
			);

			// Get all unique ids of senders
			const idOfSenders = messagesToForward
				.filter(
					(message, index, self) =>
						index ===
						self.findIndex((msg) => msg.sender === message.sender)
				)
				.map((item) => item.sender);

			// Get populated senders
			const senders = allParticipants.filter((participant) =>
				idOfSenders.includes(participant._id)
			);

			if (senders.length === 1) {
				additionalPanelHeader = senders[0].givenName;
				additionalPanelContent = messagesToForward[0].text;
			}

			if (senders.length === 2) {
				additionalPanelHeader = `${senders[0].givenName} and ${senders[1].givenName}`;
				additionalPanelContent = `${selectedMessages.length} forwarded messages`;
			}

			if (senders.length > 2) {
				additionalPanelHeader = `${senders[0].givenName} and ${
					senders.length - 1
				} others`;
				additionalPanelContent = `${selectedMessages.length} forwarded messages`;
			}
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.backButton}>
					<button onClick={onGoBack} className="btn-transperent">
						<i className="fas fa-arrow-left"></i>
					</button>
				</div>
				<div className={styles.userInfo}>
					<div>{`${givenName} ${familyName}`}</div>
					{displayChatProcess}
				</div>
			</div>

			<div className={styles.divider}></div>

			<div ref={messagesDiv} className={styles.messages}>
				{messages}
			</div>

			{(isEditing || isForwarding) && (
				<div className={styles.editingPanel}>
					<div>
						<div className={styles.editIcon}>
							{additionalPanelIcon}
						</div>
						<div className={styles.editStatus}>
							<div>{additionalPanelHeader}</div>
							<div>{additionalPanelContent}</div>
						</div>
					</div>
					<div>
						<button
							className="btn-transperent"
							onClick={
								isEditing
									? handleStopEditing
									: handleStopForwarding
							}
						>
							<i
								style={{ color: "#a8a8a8" }}
								className="fas fa-times"
							/>
						</button>
					</div>
				</div>
			)}
			<form className={styles.writeMessageBlock} onSubmit={handleSubmit}>
				<Textarea
					textareaOptions={textareaOptions}
					autoFocus={true}
					setTextareaOptions={setTextareaOptions}
					handleKeyDown={handleTextAreaKeyDown}
					placeholder="Write a message..."
					classNames={styles.messageTextarea}
					ref={textAreaRef}
				/>
				{isEditing ? (
					<button type="submit" className="btn-transperent">
						<i
							style={{ fontSize: "1.4rem" }}
							className="fas fa-check"
						/>
					</button>
				) : (
					<button type="submit" className="btn-transperent">
						<i
							style={{ fontSize: "1.4rem" }}
							className="fas fa-paper-plane"
						></i>
					</button>
				)}
			</form>
		</div>
	);
};

export default DisplayChat;
