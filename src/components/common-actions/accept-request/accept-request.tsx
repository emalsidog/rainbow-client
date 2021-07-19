// Dependencies
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { acceptFriendReqRequest } from "../../../redux/friends/actions";

// Selector
import { selectIsLoading } from "../../../redux/user/selector";

// Types
interface AcceptRequestProps {
	id: string;
}

const AcceptRequest: React.FC<AcceptRequestProps> = ({ id }) => {
	const dispatch = useDispatch();

	const { friendsAction } = useSelector(selectIsLoading)

	const handleClick = (): void => {
		dispatch(acceptFriendReqRequest(id));
	};

	return (
		<button disabled={friendsAction} className="btn btn-primary" onClick={handleClick}>
			Accept request
		</button>
	);
};

export default AcceptRequest;
