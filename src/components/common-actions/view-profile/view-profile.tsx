// Dependencies
import React from "react";
import { useHistory } from "react-router-dom";

// Types
interface ViewProfileProps {
	profileId: string;
	callback?: () => void;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ profileId, callback }) => {
	const history = useHistory();

	const handleClick = (): void => {
		history.push(`/${profileId}`);
		if (callback) callback();
	};

	return (
		<button className="btn btn-primary" onClick={handleClick}>
			View profile
		</button>
	);
};

export default ViewProfile;
