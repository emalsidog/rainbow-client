// Dependencies
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../../redux/selectors/user-selector";

// Styles
import "./sidebar.css";

const Sidebar = () => {
	const user = useSelector(selectUser);

	return (
		<div className="col-2 sidebar-container">
			<NavLink
				className="sidebar-item"
				activeClassName="active"
				to={`/${user.profileId}`}
			>
				<i className="fas fa-home fa-fw"></i>

				<span>Home</span>
			</NavLink>

			<NavLink
				className="sidebar-item"
				activeClassName="active"
				to="/friends"
			>
				<span>
					<i className="fas fa-user-friends fa-fw"></i>
				</span>
				Friends
			</NavLink>

			<NavLink
				className="sidebar-item"
				activeClassName="active"
				to="/messenger"
			>
				<i className="fas fa-envelope fa-fw"></i>
				<span>Messenger</span>
			</NavLink>

			<NavLink
				className="sidebar-item"
				activeClassName="active"
				to="/music"
			>
				<i className="fas fa-music fa-fw"></i>
				<span>Music</span>
			</NavLink>
		</div>
	);
};

export default Sidebar;
