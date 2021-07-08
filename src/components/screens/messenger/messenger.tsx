// Dependencies
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

// Actions
import { getChatsRequest } from "../../../redux/chat/actions";

// Selectors
import { selectChats, selectUser } from "../../../redux/user/selector";

// Hooks
import useWindowSize from "../../../hocs/useWindowsSize";

// Styles
// import styles from "./messenger.module.css";

// Components
import Layout from "../../common/layout";

import DisplayDialog from "./messenger-components/display-dialog";
import DisplayChat from "./messenger-components/display-chat";

// Types
import { Chat } from "../../../redux/chat/types";

const Messenger: React.FC = () => {
	const [chatToDisplay, setChatToDisplay] = useState<Chat | null>(null);

	const dispatch = useDispatch();
	const chats = useSelector(selectChats);
	const currentUser = useSelector(selectUser);

	const history = useHistory();
	const { chatId }: any = useParams();

	const { width } = useWindowSize();

	useEffect(() => {
		dispatch(getChatsRequest());
	}, [dispatch]);

	useEffect(() => {
		const chat = chats.find((chat) => chat.chatId === chatId);
		if (!chat) return;
		setChatToDisplay(chat);
	}, [chatId, chats]);

	useEffect(() => {
		if (!chatId) {
			setChatToDisplay(null);
		}
	}, [chatId]);

	const handleDialogClick = useCallback(
		(chatId: string): void => {
			history.push(`/messenger/${chatId}`);
		},
		[history]
	);

	const handleGoBack = (): void => {
		setChatToDisplay(null);
		history.push("/messenger");
	};

	// render list of dialogs
	const listOfDialogs = chats.map((chat) => {
		const { chatId, participants, creator, messages } = chat;

		let givenName: string;
		let familyName: string;
		let avatar: string;

		if (currentUser.profileId === creator.profileId) {
			givenName = participants[0].givenName;
			familyName = participants[0].familyName;
			avatar = participants[0].avatar.linkToAvatar;
		} else {
			givenName = creator.givenName;
			familyName = creator.familyName;
			avatar = creator.avatar.linkToAvatar;
		}

		let lastMessage: string | undefined =
			messages.length > 0
				? messages[messages.length - 1].text
				: undefined;

		return (
			<DisplayDialog
				key={chatId}
				chatId={chatId}
				givenName={givenName}
				familyName={familyName}
				lastMessage={lastMessage}
				avatar={avatar}
				handleDialogClick={handleDialogClick}
				isActive={chatToDisplay?.chatId === chatId}
			/>
		);
	});

	let chat: JSX.Element | null = null;
	let dialogs: JSX.Element | null = null;

	if (chatId || width > 850) {
		chat = (
			<div className="col-7">
				{chatToDisplay && (
					<DisplayChat
						chat={chatToDisplay}
						currentUserId={currentUser._id}
						currentUserProfileId={currentUser.profileId}
						onGoBack={handleGoBack}
					/>
				)}
			</div>
		);
	}

	if (!chatId || width > 850) {
		dialogs = (
			<div style={{ marginLeft: "5px" }} className="col-3">
				{listOfDialogs}
			</div>
		);
	}

	return (
		<Layout>
			{chat}
			{dialogs}
		</Layout>
	);
};

export default Messenger;
