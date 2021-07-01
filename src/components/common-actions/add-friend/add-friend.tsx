// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { sendFriendReqRequest } from "../../../redux/friends/actions";

// Types
interface AddToFriendsProps {
	profileId: string;
}

const AddToFriends: React.FC<AddToFriendsProps> = ({ profileId }) => {
	const dispatch = useDispatch();

	const handleClick = (): void => {
		dispatch(sendFriendReqRequest(profileId));
	};

	return (
		<button
            className="btn btn-primary"
			onClick={handleClick}
		>
			Add to friends
		</button>
	);
};

export default AddToFriends;
