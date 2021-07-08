// Dependencies
import React, { useState, useEffect, useRef } from "react";
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

// Types
import { Chat, Participant } from "../../../../../redux/chat/types";
import { TextAreaOptions } from "../../../../common/textarea/textarea";

interface DisplayChatProps {
	chat: Chat;
	currentUserId: string;
	currentUserProfileId: string;

	onGoBack: () => void;
	removeChat: (value: null) => void;
}

const DisplayChat: React.FC<DisplayChatProps> = (props) => {
	const { chat, currentUserId, currentUserProfileId, onGoBack, removeChat } =
		props;

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

	useEffect(() => {
		return () => removeChat(null);
	}, [removeChat]);

	const sendMessage = (): void => {
		if (textareaOptions.value.length <= 0) return;

		let recipients: Participant[] = [chat.creator];
		let filteredParticipants: Participant[] = chat.participants.filter(
			(participant) => participant._id !== currentUserId
		);

		recipients = [...recipients, ...filteredParticipants];

		if (chat.creator._id === currentUserId) {
			recipients = [...chat.participants];
		}

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
					<span>info</span>
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
				/>
			</form>
		</div>
	);
};

export default DisplayChat;
