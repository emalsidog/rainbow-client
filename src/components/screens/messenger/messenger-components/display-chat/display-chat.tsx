// Dependencies
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

// Websocket connection
import { websocket } from "../../../../../redux/websockets/saga";

// Actions
import { addMessageRequest } from "../../../../../redux/chat/actions";

// Styles
import styles from "./display-chat.module.css";

// Components
import Textarea from "../../../../common/textarea";
import Message from "../message";
import ThreeDots from "../../../../common/spinner/three-dots";

// Types
import { Chat, ChatProcesses } from "../../../../../redux/chat/types";
import { TextAreaOptions } from "../../../../common/textarea/textarea";

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

	const [textareaOptions, setTextareaOptions] = useState<TextAreaOptions>({
		rows: 1,
		minRows: 1,
		maxRows: 10,
		charactersLimit: 500,
		value: "",
	});

	const dispatch = useDispatch();

	const messagesDiv = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesDiv.current) {
			messagesDiv.current!.scrollTop = messagesDiv.current!.scrollHeight;
		}
	}, [chat.messages]);

	const isTyping = useRef<boolean>(false);

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

	const sendMessage = (): void => {
		if (textareaOptions.value.length <= 0) return;

		const recipients = getParticipants();

		const payload = {
			message: {
				text: textareaOptions.value,
				time: new Date(),
				sender: currentUserId,
				chatId: chat.chatId,
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		sendMessage();
	};

	const onEnter = (): void => {
		sendMessage();
	};

	let givenName: string;
	let familyName: string;

	if (currentUserProfileId === chat.creator.profileId) {
		givenName = chat.participants[0].givenName;
		familyName = chat.participants[0].familyName;
	} else {
		givenName = chat.creator.givenName;
		familyName = chat.creator.familyName;
	}

	let messages;

	if (chat.messages.length > 0) {
		messages = chat.messages.map((message, index) => {
			return (
				<Message
					key={index}
					messageText={message.text}
					isRightAligned={message.sender === currentUserId}
				/>
			);
		});
	} else {
		messages = <div className={styles.sayHiBlock}>Say hi!</div>;
	}

	let displayChatProcess: JSX.Element | undefined = undefined;

	switch (chat.status.type) {
		case "TYPING":
			displayChatProcess = <span>typing...</span>;
			break;
		case "IDLE":
			displayChatProcess = <span>idle</span>;
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

			<form className={styles.writeMessageBlock} onSubmit={handleSubmit}>
				<Textarea
					textareaOptions={textareaOptions}
					autoFocus={true}
					setTextareaOptions={setTextareaOptions}
					onEnter={onEnter}
					placeholder="Write a message..."
					classNames={styles.messageTextarea}
				/>
				<button onClick={sendMessage} className="btn-transperent">
					<i
						style={{ fontSize: "1.4rem" }}
						className="fas fa-paper-plane"
					></i>
				</button>
			</form>
		</div>
	);
};

export default DisplayChat;
