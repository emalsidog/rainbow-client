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
	forwardMessageRequest,
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
	ForwardMessagePayload,
	Participant
} from "../../../../../redux/chat/types";
import { TextAreaOptions } from "../../../../common/textarea/textarea";
import { formatDate } from "../../../../utils/format-date";
import Modal from "../../../../common/modal";

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

	// Overlay state
	const [showOverlay, setShowOverlay] = useState<boolean>(false);

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
	const [messageToForward, setMessageToForward] =	useState<MessageType | null>(null);
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
	const handleTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === "Enter") {
			e.preventDefault();

			if (isEditing) return saveEditedMessage();
			if (isForwarding) return sendForwardedMessage();

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

	// Scroll to bottom of the chat if last message was updated
	const lastMessage = chat.messages[chat.messages.length - 1];
	useEffect(() => {
		messagesDiv.current && scrollDown(messagesDiv);
	}, [lastMessage]);

	// Flag for stopping sending server requests on each changing in textarea.
	const isTyping = useRef<boolean>(false);

	// Helper. Get ids of chat participants
	const getParticipants = useCallback((): string[] => {
		let recipients: string[] = [chat.creator._id];

		let filteredParticipants: string[] = chat.participants
			.filter(participant => participant._id !== currentUserId)
			.map(filteredParticipant => filteredParticipant._id);

		recipients = [...recipients, ...filteredParticipants];

		if (chat.creator._id === currentUserId) {
			recipients = chat.participants.map(participant => participant._id);
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

	// Handle "Copy Text" in context menu
	const handleCopyText = (messageText: string): void => {
		handleShowOverlay(false);
		navigator.clipboard.writeText(messageText);
	};

	/* ======= MESSAGE SENDING ======= */

	// Send message.
	const sendMessage = (): void => {
		if (textareaOptions.value.trim().length <= 0) return;

		const payload = {
			message: {
				text: textareaOptions.value.trim(),
				time: new Date(),
				sender: currentUserId,
				chatId: chat.chatId,
				messageId: uuidv4(),
				isForwarded: false,
			},
			recipients: getParticipants(),
		};

		sendByWS("ADD_MESSAGE", payload);
		dispatch(addMessageRequest(payload.message));

		setTextareaOptions((prev) => ({	...prev, rows: 1, value: "" }));
		textAreaRef.current?.focus();
	};

	// Handle form submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (isEditing) return saveEditedMessage();
		if (isForwarding) return sendForwardedMessage();

		sendMessage();
	};

	/* ======= MESSAGE DELETING ======= */

	// Handle "Delete Message" in context menu.
	const handleDeleteMessage = (messageId?: string) => {
		if (!isDeleteMessageVisible) return;
		handleShowOverlay(false);

		let messagesToDelete: string[] = [];

		if (messageId) {
			messagesToDelete = [messageId];
		}

		if (selectedMessages.length > 0) {
			messagesToDelete = [...selectedMessages];
		}

		const payload = {
			messageData: {
				messagesToDelete,
				chatId: chat.chatId,
			},
			recipients: getParticipants(),
		};

		sendByWS("DELETE_MESSAGE", payload);
		dispatch(deleteMessage(payload.messageData));

		setIsSelecting(false);
	};

	/* ======= END OF MESSAGE DELETING ======= */

	/* ======= MESSAGE SELECTING ======= */
	const [isDeleteMessageVisible, setIsDeleteMessageVisible] =	useState<boolean>(true);

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
		handleShowOverlay(false);
		selectedMessages.length >= 0 ? setIsSelecting(true) : setIsSelecting(false);
		
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
			setSelectedMessages(prev => [...prev, messageId]);
			return;
		}

		setSelectedMessages(prev =>	prev.filter((id) => id !== messageId));
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
	const handleForwardMessage = useCallback((messageId?: string): void => {
			handleShowOverlay(false);

			const messageToForward = chat.messages.find(({ messageId: id }) => id === messageId);

			isEditing && handleStopEditing();
			
			if (isSelecting) {
				setIsSelecting(false);
				setForwarding();
				return;
			}
			
			selectedMessages.length > 0 && setSelectedMessages([]);
			messageToForward && setMessageToForward(messageToForward);
			setForwarding();
		},
		[chat.messages, isEditing, isSelecting, selectedMessages.length]
	);

	const setForwarding = (): void => {
		setIsForwarding(true);
		textAreaRef.current?.focus();
	}

	// Handle stop forwarding
	const handleStopForwarding = useCallback((): void => {
		setIsForwarding(false);
		setMessageToForward(null);
		setSelectedMessages([]);
	}, []);

	// Send message with forwarded messages
	const sendForwardedMessage = (): void => {
		if (textareaOptions.value.trim().length <= 0) return;

		const message: MessageType = {
			text: textareaOptions.value.trim(),
			time: new Date(),
			sender: currentUserId,
			chatId: chat.chatId,
			isForwarded: false,
			messageId: uuidv4(),
		}

		let payload: ForwardMessagePayload;

		if (messageToForward) {
			payload = {
				type: "SINGLE_FORWARDED",
				message: {
					...message,
					repliedToMessage: messageToForward,
				}
			}

			dispatch(forwardMessageRequest(payload));
			sendByWS("FORWARD_MESSAGE", { ...payload, recipients: getParticipants() });
		}

		if (selectedMessages.length > 0) {

			const populatedMessages = chat.messages.filter(message =>
				selectedMessages.includes(message.messageId)
			);

			const forwardedMessages: MessageType[] = populatedMessages.map(message => {
				return {
					text: message.text,
					time: new Date(),
					sender: currentUserId,
					chatId: chat.chatId,
					messageId: uuidv4(),
					isForwarded: true,	
				}
			})

			payload = {
				type: "MULTIPLE_FORWARDED",
				messages: [message, ...forwardedMessages],
				meta: {
					chatId: chat.chatId
				}
			}

			dispatch(forwardMessageRequest(payload));
			sendByWS("FORWARD_MESSAGE", { ...payload, recipients: getParticipants() });
		}

		setTextareaOptions(prev => ({ ...prev, rows: 1,	value: "" }));
		textAreaRef.current?.focus();

		handleStopForwarding();
	};

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
	const handleEditMessage = useCallback((messageId: string): void => {
			const messageToEdit = chat.messages.find(({ messageId: id }) => id === messageId);
			if (!messageToEdit) return;

			handleShowOverlay(false);
			isForwarding && handleStopForwarding();
			isSelecting && removeSelection();

			setMessageToEdit(messageToEdit);
			setTextareaOptions((prev) => ({ ...prev, value: messageToEdit.text }));
			setIsEditing(true);

			textAreaRef.current?.focus();
			scrollDown(messagesDiv);
		},
		[chat.messages, isSelecting, isForwarding, handleStopForwarding]
	);

	// Helper. Call it, when you want to stop editing process
	const handleStopEditing = (): void => {
		setTextareaOptions((prev) => ({ ...prev, value: "", rows: 1 }));
		setIsEditing(false);
		setMessageToEdit(null);
	};

	// Save message after editing.
	const saveEditedMessage = (): void => {
		const newText = textareaOptions.value.trim();

		const isMatch: boolean = messageToEdit?.text === newText;

		if (isMatch) return handleStopEditing();
		if (newText.length <= 0) return;

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
			recipients: getParticipants(),
		};

		sendByWS("EDIT_MESSAGE", payload)
		dispatch(editMessage(payload.data));

		handleStopEditing();
	};

	/* ======= END OF MESSAGE EDITING ======= */

	/*
	 *	Handle keyboard pressing.
	 *	Escape - stop editing process.
	 *	ArrowUp - start editing last sent message.
	 * 	CTRL + ArrowUp - start forwarding mode by going up in messages
	 * 	CTRL + ArrowDown - start forwarding mode by going down in messages
	 */

	useEffect(() => {
		index.current = chat.messages.length;
	}, [chat.messages]);

	const handleEditingKeyDown = useCallback((e: any): void => {

			if (e.ctrlKey && e.key === "ArrowUp") {
				index.current = index.current - 1;
				if (index.current < 0) {
					index.current = chat.messages.length - 1;
				}
				handleForwardMessage(chat.messages[index.current].messageId)
				return;
			}

			if (e.ctrlKey && e.key === "ArrowDown") {
				index.current = index.current + 1;
				if (index.current > chat.messages.length - 1) {
					index.current = 0;
				}
				handleForwardMessage(chat.messages[index.current].messageId)
				return;
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
			index,
			isEditing,
			currentUserId,
			isForwarding,
			handleForwardMessage,
			handleEditMessage,
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

	// Overlay handlers
	const handleShowOverlay = (show: boolean): void => {
		setShowOverlay(show);
	}

	const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		e.preventDefault();
		handleShowOverlay(false);
	}

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
			const { messageId, text, time, sender, isEdited, timeEdited, repliedToMessage, isForwarded } = message;

			const { displaySeparator, date } = displayDateSeparator(message.time, array[index - 1]?.time);

			let isSelected: boolean = false;
			if (isSelecting) {
				isSelected = selectedMessages.includes(messageId);
			}

			let isSelectedToForward: boolean = false;
			if (messageId === messageToForward?.messageId) {
				isSelectedToForward = true;
			}

			const allParticipants = [chat.creator, ...chat.participants];

			let transformedRepliedMessage;
			if (repliedToMessage) {
				const populatedSender = allParticipants.find(participant => participant._id === repliedToMessage.sender);

				transformedRepliedMessage = {
					messageText: repliedToMessage.text,
					senderName: populatedSender?.givenName
				}

			}

			let populatedSender: Participant | undefined;
			if (isForwarded) {
				populatedSender = allParticipants.find(participant => participant._id === message.sender);
			}

			const methods = {
				onClick: () => onMessageClick(messageId),
				handleCopyText: () => handleCopyText(text),
				handleDeleteMessage: () => handleDeleteMessage(messageId),
				handleEditMessage: () => handleEditMessage(messageId),
				handleSelectMessage: () => handleSelectMessage(messageId),
				handleForwardMessage: () => handleForwardMessage(messageId),

				handleShowOverlay
			}

			const properties = {
				messageText: text,
				isRightAligned: sender === currentUserId,
				messageDate: time,
				isEdited,
				timeEdited,
				isSelected,
				isInSelectingMode: isSelecting,
				isDeleteMessageVisible,
				isSelectedToForward,

				repliedToMessage: transformedRepliedMessage,
				isForwarded,
				sender: isForwarded ? populatedSender : undefined
			}

			if (displaySeparator) {
				return (
					<React.Fragment key={messageId}>
						<div className={styles.messagesDate}>
							{formatDate(date, "REGULAR")}
						</div>
						<Message
							{ ...properties }
							{ ...methods }
						/>
					</React.Fragment>
				);
			}

			return (
				<Message
					key={messageId}
					{ ...properties }
					{ ...methods }
				/>
			);
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
	} 
	
	if (isForwarding) {
		// Get all populated participants
		const allParticipants = [chat.creator, ...chat.participants];

		// Set icon
		additionalPanelIcon = <i className="fas fa-share" />;

		// If there are no selected messages = use single messageToForward
		if (messageToForward) {
			const sender = allParticipants.find(
				(participant) => participant._id === messageToForward.sender
			);

			additionalPanelHeader = sender?.givenName;
			additionalPanelContent = messageToForward.text;
		} else {
			// Get populated messages to forward
			const messagesToForward = chat.messages.filter((message) =>
				selectedMessages.includes(message.messageId)
			);

			// Get all unique ids of senders
			const idOfSenders = messagesToForward
				.filter((message, index, self) =>
					index === self.findIndex((msg) => msg.sender === message.sender)
				)
				.map((item) => item.sender);

			// Get populated senders
			const senders = allParticipants.filter((participant) =>
				idOfSenders.includes(participant._id)
			);

			if (senders.length === 1 && messagesToForward.length > 1) {
				additionalPanelHeader = senders[0].givenName;
				additionalPanelContent = `${selectedMessages.length} forwarded messages`;
			}

			if (senders.length === 1 && messagesToForward.length === 1) {
				additionalPanelHeader = senders[0].givenName;
				additionalPanelContent = messagesToForward[0].text;
			}

			if (senders.length === 2) {
				additionalPanelHeader = `${senders[0].givenName} and ${senders[1].givenName}`;
				additionalPanelContent = `${selectedMessages.length} forwarded messages`;
			}

			if (senders.length > 2) {
				additionalPanelHeader = `${senders[0].givenName} and ${senders.length - 1} others`;
				additionalPanelContent = `${selectedMessages.length} forwarded messages`;
			}
		}
	}

	return (
		<div className={styles.wrapper}>
			{showOverlay && <div onTouchEnd={onTouchEnd} className={styles.overlay}></div>}
			<div className={styles.header}>
				<div className={styles.backButton}>
					<button onClick={onGoBack} className="btn-transperent">
						<i className="fas fa-arrow-left"></i>
					</button>
				</div>
				{
					!isSelecting ? (
						<div className={styles.userInfo}>
							<div>{`${givenName} ${familyName}`}</div>
							{displayChatProcess}
						</div>
					) : (
						<div className={styles.actions}>
							<button 
								disabled={!isDeleteMessageVisible}
								onClick={() => handleDeleteMessage()}
								className="btn btn-primary"
							>
								Delete
							</button>
							<button 
								onClick={() => handleForwardMessage()}
								className="btn btn-primary"
							>
									Forward
							</button>
						</div>
					)
				}
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

/*
 *	Display date if date of sending message is the next day
 *
 *	16 June 1942
 *	- Old message
 *	17 June 1942
 *	- New message
 */

const displayDateSeparator = (current: Date, previous: Date): {
	displaySeparator: boolean;
	date?: Date
} => {
	const currentMessageDate = new Date(current);
	const previousMessageDate = new Date(previous);

	const currentMessageDay = currentMessageDate.getDate();
	const previousMessageDay = previousMessageDate.getDate();

	const displayMessagedDate: boolean = currentMessageDay - previousMessageDay >= 1;

	if (displayMessagedDate || isNaN(previousMessageDay)) {
		return {
			displaySeparator: true,
			date: currentMessageDate
		}
	}

	return {
		displaySeparator: false,
	}
}

// Handle scrolling down
const scrollDown = (element: React.RefObject<HTMLDivElement>): void => {
	element.current!.scrollTop = element.current!.scrollHeight;
};

// Handle send by websocket
const sendByWS = (type, payload): void => {
	websocket.send(JSON.stringify({ type, payload }));
}

export default DisplayChat;
