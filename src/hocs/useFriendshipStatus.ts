// Dependencies
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { User } from "../redux/common-types";

// Selectors
import { selectUser } from "../redux/user/selector";

// Types
import { FriendshipStatus } from "../redux/common-types";

export const useFriendshipStatus = (displayedUser: User) => {
    const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>("NONE");

    const currentUser = useSelector(selectUser);

    useEffect(() => {
		const { _id, friendRequests, friends } = currentUser;

		if (displayedUser) {
			if (friendRequests.includes(displayedUser._id)) {
				setFriendshipStatus("PENDING_FOR_YOUR_RESPONSE")
				return;
			}
			
			if (displayedUser.friendRequests.includes(_id)) {
				setFriendshipStatus("PENDING_FOR_USER_RESPONSE")
				return;
			}

			if (friends.includes(displayedUser._id)) {
				setFriendshipStatus("FRIENDS")
				return;
			}
			setFriendshipStatus("NONE")
		}
	}, [displayedUser, currentUser]);

    return friendshipStatus;
}