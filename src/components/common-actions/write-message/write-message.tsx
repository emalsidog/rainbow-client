// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { createChatRequest } from "../../../redux/chat/actions";

// Types
interface WriteMessageProps {
	id: string;
}

const WriteMessage: React.FC<WriteMessageProps> = ({ id }) => {
	const dispatch = useDispatch();

	const handleClick = (): void => {
		dispatch(createChatRequest([id]));
	};

	return (
		<button className="btn btn-primary" onClick={handleClick}>
			Write a message
		</button>
	);
};

export default WriteMessage;
