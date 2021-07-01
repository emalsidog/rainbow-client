// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { declineFriendReqRequest } from "../../../redux/friends/actions";

// Types
interface DeclineRequestProps {
	id: string;
}

const DeclineRequest: React.FC<DeclineRequestProps> = ({ id }) => {
	const dispatch = useDispatch();

	const handleClick = (): void => {
		dispatch(declineFriendReqRequest(id));
	};

	return (
		<button className="btn btn-danger" onClick={handleClick}>
			Decline request
		</button>
	);
};

export default DeclineRequest;