// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { removeFromFriendsRequest } from "../../../redux/users/actions";

// Types
interface RemoveFromFriendsProps {
    id: string;
}

const RemoveFromFriends: React.FC<RemoveFromFriendsProps> = ({ id }) => {
    const dispatch = useDispatch();

	const handleClick = (): void => {
        dispatch(removeFromFriendsRequest(id));
    };

	return (
		<button className="btn btn-danger" onClick={handleClick}>
			Remove from friends
		</button>
	);
};

export default RemoveFromFriends;