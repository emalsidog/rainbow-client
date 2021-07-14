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

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [messageToEdit, setMessageToEdit] = useState<MessageType | null>(
		null
	);

	const [textareaOptions, setTextareaOptions] = useState<TextAreaOptions>({
		rows: 1,
		minRows: 1,
		maxRows: 10,
		charactersLimit: 500,
		value: "",
	});

	const dispatch = useDispatch();

	let id: string = chat.creator._id;
	if (currentUserId === id) {
		id = chat.participants[0]._id;
	}

	const onlineStatus = useOnlineStatus(id);

	const messagesDiv = useRef<HTMLDivElement>(null);

	// Scroll to bottom when last message in messages array updates
	const lastMessage = chat.messages[chat.messages.length - 1];
	useEffect(() => {
		if (messagesDiv.current) {
			messagesDiv.current!.scrollTop = messagesDiv.current!.scrollHeight;
		}
	}, [lastMessage]);

	const isTyping = useRef<boolean>(false);

	// Get ids of participants
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

	// Send message
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
	};

	// Handle save edited message
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

	// Handle form submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (isEditing) {
			return saveEditedMessage();
		}
		sendMessage();
	};

	// On keydown in textarea
	const handleKeyDown = (
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

	// Handle delete message
	const handleDeleteMessage = (messageId: string) => {
		const recipients = getParticipants();

		const payload = {
			messageData: {
				messageId,
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
	};

	// Handle edit message
	const handleEditMessage = useCallback(
		(messageId: string): void => {
			const messageToEdit = chat.messages.find(
				(message) => message.messageId === messageId
			);
			if (!messageToEdit) return;

			setMessageToEdit(messageToEdit);
			setTextareaOptions((prev) => ({
				...prev,
				value: messageToEdit.text,
			}));
			setIsEditing(true);
		},
		[chat.messages]
	);

	// Handle stop editing
	const handleStopEditing = (): void => {
		setTextareaOptions((prev) => ({ ...prev, value: "" }));
		setIsEditing(false);
		setMessageToEdit(null);
	};

	// handle editing key downs
	const handleEditingKeyDown = useCallback(
		(e: any): void => {
			switch (e.key) {
				case "Escape":
					isEditing && handleStopEditing();
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
		[chat.messages, isEditing, handleEditMessage, currentUserId]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleEditingKeyDown);
		return () => {
			document.removeEventListener("keydown", handleEditingKeyDown);
		};
	}, [handleEditingKeyDown]);

	let givenName: string;
	let familyName: string;

	if (currentUserProfileId === chat.creator.profileId) {
		givenName = chat.participants[0].givenName;
		familyName = chat.participants[0].familyName;
	} else {
		givenName = chat.creator.givenName;
		familyName = chat.creator.familyName;
	}

	let messages: JSX.Element[] | JSX.Element = [];

	if (chat.messages.length > 0) {
		messages = chat.messages.map((message, index, array) => {
			const { messageId, text, time, sender, isEdited, timeEdited } =
				message;

			const currentMessageDate = new Date(message.time);
			const previousMessageDate = new Date(array[index - 1]?.time);

			const currentMessageDay = currentMessageDate.getDate();
			const previousMessageDay = previousMessageDate.getDate();

			if (
				currentMessageDay - previousMessageDay >= 1 ||
				isNaN(previousMessageDay)
			) {
				return (
					<React.Fragment key={messageId}>
						<div className={styles.messagesDate}>
							{formatDate(currentMessageDate, "REGULAR")}
						</div>
						<Message
							messageText={text}
							isRightAligned={sender === currentUserId}
							messageDate={time}
							isEdited={isEdited}
							timeEdited={timeEdited}
							handleDeleteMessage={() =>
								handleDeleteMessage(messageId)
							}
							handleEditMessage={() =>
								handleEditMessage(messageId)
							}
						/>
					</React.Fragment>
				);
			}

			return (
				<Message
					key={messageId}
					messageText={text}
					isRightAligned={sender === currentUserId}
					messageDate={time}
					isEdited={isEdited}
					timeEdited={timeEdited}
					handleDeleteMessage={() => handleDeleteMessage(messageId)}
					handleEditMessage={() => handleEditMessage(messageId)}
				/>
			);
		});
	} else {
		messages = <div className={styles.sayHiBlock}>Say hi!</div>;
	}

	let displayChatProcess: JSX.Element | undefined = undefined;

	switch (chat.status.type) {
		case "TYPING":
			displayChatProcess = <ThreeDots loadingText="typing" />;
			break;
		case "IDLE":
			displayChatProcess = <span>{onlineStatus.status}</span>;
			break;
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

			{isEditing && (
				<div className={styles.editingPanel}>
					<div>
						<div className={styles.editIcon}>
							<i className="fas fa-edit"></i>
						</div>
						<div className={styles.editStatus}>
							<div>Edit message</div>
							<div>{messageToEdit?.text}</div>
						</div>
					</div>
					<div>
						<button
							className="btn-transperent"
							onClick={handleStopEditing}
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
					handleKeyDown={handleKeyDown}
					placeholder="Write a message..."
					classNames={styles.messageTextarea}
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
