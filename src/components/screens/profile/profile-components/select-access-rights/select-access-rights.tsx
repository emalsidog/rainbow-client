// Dependencies
import React from "react";

// Types
interface SelectAccessRightsProps {
	isLoading: boolean;
	isPublic: boolean;
	setIsPublic: (value: boolean) => void;
}

const SelectAccessRights: React.FC<SelectAccessRightsProps> = (props) => {
	const { isLoading, setIsPublic, isPublic } = props;

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === "PUBLIC") {
			setIsPublic(true);
		} else {
			setIsPublic(false);
		}
	};

	return (
		<select
			defaultValue={isPublic ? "PUBLIC" : "PRIVATE"}
			onChange={handleSelectChange}
			disabled={isLoading}
			className="select"
		>
			<option value="PUBLIC">Public</option>
			<option value="PRIVATE">Private</option>
		</select>
	);
};

export default SelectAccessRights;
