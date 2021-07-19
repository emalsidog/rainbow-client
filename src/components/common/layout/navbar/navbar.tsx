// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Actions
import { logoutRequest } from "../../../../redux/auth/actions";

// Selectors
import { selectUser } from "../../../../redux/user/selector";

// Assets
import { ReactComponent as Logo } from "./assets/vector_logo.svg";

// Styles
import "./navbar.css";

// Components
import Dropdown, { DropdownItem, DropdownDivider } from "../../dropdown";

const Navbar = () => {
	const [scrollPos, setScrollPos] = useState<number>(0);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const history = useHistory();

	// Listen to scroll event
	useEffect(() => {
		window.addEventListener("scroll", updateScroll);
		return () => window.removeEventListener("scroll", updateScroll);
	}, []);

	// Handle scroll event
	const updateScroll = () => {
		setScrollPos(document.documentElement.scrollTop);
	};

	// Handle logount action
	const handleLogout = () => {
		dispatch(logoutRequest());
	};

	// Handle settings action
	const handleSettings = () => {
		history.push("/settings");
	};

	// Handle profile action
	const handleProfile = () => {
		history.push(`/${user.profileId}`);
	};

	let classNames: string = "navbar ";
	if (scrollPos > 0) {
		classNames += "shadow";
	}

	return (
		<header className={classNames}>
			<div className="navbar-container">
				<div className="navbar-logo">
					<Logo style={{ height: 35 }} />
				</div>
				<Dropdown avatar={user.avatar}>
					<DropdownItem
						onClick={handleProfile}
						title={`${user.givenName} ${user.familyName}`}
					/>
					<DropdownDivider />
					<DropdownItem onClick={handleSettings} title="Settings" />
					<DropdownItem
						onClick={() => console.log("Blog")}
						title="Blog"
					/>
					<DropdownDivider />
					<DropdownItem onClick={handleLogout} title="Logout" />
				</Dropdown>
			</div>
		</header>
	);
};

export default Navbar;
