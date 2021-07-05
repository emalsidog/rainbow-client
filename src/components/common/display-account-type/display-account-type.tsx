// Dependencies
import React from "react";

// Types
import { AccountType } from "../../../redux/common-types";
interface DisplayAccountTypeProps {
    accountType: AccountType
}

const DisplayAccountType: React.FC<DisplayAccountTypeProps> = ({ accountType }) => {
    let displayAccountType: JSX.Element | null = null;

	switch (accountType) {
		case "MEMBER":
			displayAccountType = null;
			break;
		case "DEVELOPER":
			displayAccountType = (
				<i
					style={{ marginLeft: "10px" }}
					className="fab fa-dev"
				/>
			);
			break;
		case "VERIFIED":
			displayAccountType = (
				<i
					style={{ marginLeft: "10px" }}
					className="fas fa-check"
				/>
			);
			break;
	}
    return displayAccountType;
}

export default DisplayAccountType;