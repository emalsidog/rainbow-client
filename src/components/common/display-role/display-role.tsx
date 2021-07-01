// Dependencies
import React from "react";

// Types
import { UserRole } from "../../../redux/common-types";
interface DisplayRoleProps {
    role: UserRole
}

const DisplayRole: React.FC<DisplayRoleProps> = ({ role }) => {
    let displayRole: JSX.Element | null = null;

	switch (role) {
		case "MEMBER":
			displayRole = null;
			break;
		case "DEVELOPER":
			displayRole = (
				<i
					style={{ marginLeft: "10px", fontSize: "1.5rem" }}
					className="fab fa-dev"
				/>
			);
			break;
		case "VERIFIED":
			displayRole = (
				<i
					style={{ marginLeft: "10px", fontSize: "1.5rem" }}
					className="fas fa-check"
				/>
			);
			break;
	}
    return displayRole;
}

export default DisplayRole;