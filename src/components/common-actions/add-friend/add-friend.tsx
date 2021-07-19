// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { sendFriendReqRequest } from "../../../redux/friends/actions";

// Selectors
import { selectIsLoading } from "../../../redux/user/selector";

// Types
interface AddToFriendsProps {
	profileId: string;
}

const AddToFriends: React.FC<AddToFriendsProps> = ({ profileId }) => {
	const dispatch = useDispatch();

	const { friendsAction } = useSelector(selectIsLoading);

	const handleClick = (): void => {
		dispatch(sendFriendReqRequest(profileId));
	};

	return (
		<button disabled={friendsAction} className="btn btn-primary" onClick={handleClick}>
			Add to friends
		</button>
	);
};

export default AddToFriends;
