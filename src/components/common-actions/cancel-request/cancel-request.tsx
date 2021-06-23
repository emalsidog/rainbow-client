// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { cancelFriendReqRequest } from "../../../redux/users/actions";

// Types
interface CancelRequestProps {
	id: string;
}

const CancelRequest: React.FC<CancelRequestProps> = ({ id }) => {
	const dispatch = useDispatch();

	const handleClick = (): void => {
		dispatch(cancelFriendReqRequest(id));
	};

	return (
		<button className="btn btn-danger" onClick={handleClick}>
			Cancel request
		</button>
	);
};

export default CancelRequest;