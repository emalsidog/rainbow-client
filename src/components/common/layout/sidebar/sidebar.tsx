// Dependencies
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// Styles
import "./sidebar.css";

// Types
interface SidebarProps {
	children: ReactNode;
}

interface SidebarItemProps {
	children: ReactNode;
	linkTo: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { children } = props;

	const classNames = "col-2 sidebar-container";

	return <div className={classNames}>{children}</div>;
};

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
	const { children, linkTo } = props;

	return (
		<NavLink className="sidebar-item" activeClassName="active" to={linkTo}>
			{children}
		</NavLink>
	);
};

export default Sidebar;
export { SidebarItem };
