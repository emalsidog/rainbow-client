// Dependencies
import { useState, useEffect } from "react";
import { User } from "../redux/common-types";

// Types
import { FriendshipStatus } from "../redux/common-types";

export const useFriendshipStatus = (currentUser: User, displayedUser: User) => {
    const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>("NONE");
    
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