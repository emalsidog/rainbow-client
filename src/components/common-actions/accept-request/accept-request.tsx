// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { acceptFriendReqRequest } from "../../../redux/users/actions";

// Types
interface AcceptRequestProps {
	id: string;
}

const AcceptRequest: React.FC<AcceptRequestProps> = ({ id }) => {
	const dispatch = useDispatch();

	const handleClick = (): void => {
		dispatch(acceptFriendReqRequest(id));
	};

	return (
		<button className="btn btn-primary" onClick={handleClick}>
			Accept request
		</button>
	);
};

export default AcceptRequest;
