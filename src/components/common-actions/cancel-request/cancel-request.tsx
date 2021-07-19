// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { cancelFriendReqRequest } from "../../../redux/friends/actions";

// Selectors
import { selectIsLoading } from "../../../redux/user/selector";

// Types
interface CancelRequestProps {
	id: string;
}

const CancelRequest: React.FC<CancelRequestProps> = ({ id }) => {
	const dispatch = useDispatch();

	const { friendsAction } = useSelector(selectIsLoading);

	const handleClick = (): void => {
		dispatch(cancelFriendReqRequest(id));
	};

	return (
		<button disabled={friendsAction} className="btn btn-danger" onClick={handleClick}>
			Cancel request
		</button>
	);
};

export default CancelRequest;