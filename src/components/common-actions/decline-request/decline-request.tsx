// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { declineFriendReqRequest } from "../../../redux/friends/actions";

// Selectors
import { selectIsLoading } from "../../../redux/user/selector";

// Types
interface DeclineRequestProps {
	id: string;
}

const DeclineRequest: React.FC<DeclineRequestProps> = ({ id }) => {
	const dispatch = useDispatch();

	const { friendsAction } = useSelector(selectIsLoading);

	const handleClick = (): void => {
		dispatch(declineFriendReqRequest(id));
	};

	return (
		<button disabled={friendsAction} className="btn btn-danger" onClick={handleClick}>
			Decline request
		</button>
	);
};

export default DeclineRequest;