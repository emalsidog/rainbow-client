// Dependencies
import React from "react";

// Components
import AddToFriends from "../../common-actions/add-friend";
import ViewProfile from "../../common-actions/view-profile";
import AcceptRequest from "../../common-actions/accept-request";
import DeclineRequest from "../../common-actions/decline-request";
import RemoveFromFriends from "../../common-actions/remove-from-friends";
import CancelRequest from "../../common-actions/cancel-request";

// Types
import { FriendshipStatus } from "../../../redux/common-types";

interface DisplayActionsProps {
	displayViewProfileButton?: boolean;
	friendshipStatus: FriendshipStatus;
	userId: string;
	userProfileId: string;
}

const DisplayActions: React.FC<DisplayActionsProps> = (props) => {
    const { friendshipStatus, userId, userProfileId, displayViewProfileButton = true } = props;

	switch (friendshipStatus) {
		case "FRIENDS": {
			return (
				<React.Fragment>
					<button className="btn btn-primary">Write a message</button>
					{ displayViewProfileButton && <ViewProfile profileId={userProfileId} /> }
					<RemoveFromFriends id={userId} />
				</React.Fragment>
			);
		}
		case "PENDING_FOR_USER_RESPONSE": {
			return (
				<React.Fragment>
					{ displayViewProfileButton && <ViewProfile profileId={userProfileId} /> }
					<CancelRequest id={userId} />
				</React.Fragment>
			);
		}
		case "PENDING_FOR_YOUR_RESPONSE": {
			return (
				<React.Fragment>
					{ displayViewProfileButton && <ViewProfile profileId={userProfileId} /> }
					<AcceptRequest id={userId} />
					<DeclineRequest id={userId} />
				</React.Fragment>
			);
		}
		case "NONE": {
			return (
				<React.Fragment>
					<AddToFriends profileId={userProfileId} />
					{ displayViewProfileButton && <ViewProfile profileId={userProfileId} /> }
				</React.Fragment>
			);
		}
	}
};

export default DisplayActions;