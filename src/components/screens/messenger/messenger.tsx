// Dependencies
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

// Actions
import { getChatsRequest } from "../../../redux/chat/actions";

// Selectors
import { selectChats, selectUser } from "../../../redux/user/selector";

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

	useEffect(() => {
		dispatch(getChatsRequest());
	}, [dispatch]);

	const handleDialogClick = useCallback(
		(chatId: string): void => {
			history.push(`/messenger/${chatId}`);
		},
		[history]
	);

	useEffect(() => {
		const chat = chats.find((chat) => chat.chatId === chatId);
		if (!chat) return;
		setChatToDisplay(chat);
	}, [chatId, chats]);

	// render list of dialogs
	const listOfDialogs = chats.map((chat) => {
		const { chatId, participants, creator } = chat;

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

		return (
			<DisplayDialog
				key={chatId}
				chatId={chatId}
				givenName={givenName}
				familyName={familyName}
				avatar={avatar}
				handleDialogClick={handleDialogClick}
				isActive={chatToDisplay?.chatId === chatId}
			/>
		);
	});

	return (
		<Layout>
			<div className="col-7">
				{chatToDisplay && (
					<DisplayChat
						chat={chatToDisplay}
						currentUserId={currentUser._id}
						currentUserProfileId={currentUser.profileId}
					/>
				)}
			</div>
			<div style={{ marginLeft: "5px" }} className="col-3">
				{listOfDialogs}
			</div>
		</Layout>
	);
};

export default Messenger;
