// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Actions
import { logoutRequest } from "../../../../redux/auth/actions";

// Selectors
import { selectUser } from "../../../../redux/user/selector";

// Assets
import logo from "../../../../assets/images/logo.png";

// Styles
import "./navbar.css";

// Components
import Dropdown, { DropdownItem, DropdownDivider } from "../../dropdown";

const Navbar = () => {
	const [scrollPos, setScrollPos] = useState<number>(0);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const history = useHistory();

	useEffect(() => {
		window.addEventListener("scroll", updateScroll);
		return () => window.removeEventListener("scroll", updateScroll);
	}, []);

	const updateScroll = () => {
		setScrollPos(document.documentElement.scrollTop);
	};

	const handleLogout = () => {
		dispatch(logoutRequest());
	};

	const handleSettings = () => {
		history.push("/settings");
	};

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
					<img src={logo} alt="Rainbow" />
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
