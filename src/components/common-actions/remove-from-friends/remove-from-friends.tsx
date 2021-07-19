// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { removeFromFriendsRequest } from "../../../redux/friends/actions";

// Selectors
import { selectIsLoading } from "../../../redux/user/selector";

// Types
interface RemoveFromFriendsProps {
    id: string;
}

const RemoveFromFriends: React.FC<RemoveFromFriendsProps> = ({ id }) => {
    const dispatch = useDispatch();

	const { friendsAction } = useSelector(selectIsLoading);

	const handleClick = (): void => {
        dispatch(removeFromFriendsRequest(id));
    };

	return (
		<button disabled={friendsAction} className="btn btn-danger" onClick={handleClick}>
			Remove from friends
		</button>
	);
};

export default RemoveFromFriends;