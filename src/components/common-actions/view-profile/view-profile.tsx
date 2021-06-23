// Dependencies
import React from "react";
import { useHistory } from "react-router-dom";

// Types
interface ViewProfileProps {
	profileId: string;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ profileId }) => {
	const history = useHistory();

	const handleClick = (): void => {
		history.push(`/${profileId}`);
	};

	return (
		<button className="btn btn-primary" onClick={handleClick}>
			View profile
		</button>
	);
};

export default ViewProfile;
