// Dependencies
import React from "react";

// Components
import AddToFriends from "../add-friend";
import ViewProfile from "../view-profile";
import AcceptRequest from "../accept-request";
import DeclineRequest from "../decline-request";
import RemoveFromFriends from "../remove-from-friends";
import CancelRequest from "../cancel-request";
import WriteMessage from "../write-message";

// Types
import { FriendshipStatus } from "../../../redux/common-types";

interface DisplayActionsProps {
	displayViewProfileButton?: boolean;
	friendshipStatus: FriendshipStatus;
	userId: string;
	userProfileId: string;
}

const DisplayActions: React.FC<DisplayActionsProps> = (props) => {
	const {
		friendshipStatus,
		userId,
		userProfileId,
		displayViewProfileButton = true,
	} = props;

	switch (friendshipStatus) {
		case "FRIENDS": {
			return (
				<React.Fragment>
					<WriteMessage id={userId} />
					{displayViewProfileButton && (
						<ViewProfile profileId={userProfileId} />
					)}
					<RemoveFromFriends id={userId} />
				</React.Fragment>
			);
		}
		case "PENDING_FOR_USER_RESPONSE": {
			return (
				<React.Fragment>
					{displayViewProfileButton && (
						<ViewProfile profileId={userProfileId} />
					)}
					<CancelRequest id={userId} />
				</React.Fragment>
			);
		}
		case "PENDING_FOR_YOUR_RESPONSE": {
			return (
				<React.Fragment>
					{displayViewProfileButton && (
						<ViewProfile profileId={userProfileId} />
					)}
					<AcceptRequest id={userId} />
					<DeclineRequest id={userId} />
				</React.Fragment>
			);
		}
		case "NONE": {
			return (
				<React.Fragment>
					<AddToFriends profileId={userProfileId} />
					{displayViewProfileButton && (
						<ViewProfile profileId={userProfileId} />
					)}
				</React.Fragment>
			);
		}
	}
};

export default DisplayActions;
