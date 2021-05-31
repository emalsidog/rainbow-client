// Dependencies
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

// Styles
import "./sidebar.css";

// Types
interface SidebarProps {
	children: ReactNode;
	secondSidebar?: boolean;
}

interface SidebarItemProps {
	children: ReactNode;
	linkTo: string;
	hashLink?: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { children, secondSidebar = false } = props;

	const classNames = secondSidebar
		? "col-2 sidebar-container right-sidebar"
		: "col-2 sidebar-container left-sidebar";

	return <div className={classNames}>{children}</div>;
};

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
	const { children, linkTo, hashLink = false } = props;

	const scrollWithOffset = (el: HTMLElement) => {
		const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
		const yOffset = -60;
		window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
	};

	if (hashLink) {
		return (
			<NavHashLink
				className="sidebar-item"
				activeClassName="active"
				to={linkTo}
				scroll={scrollWithOffset}
			>
				{children}
			</NavHashLink>
		);
	}
	return (
		<NavLink className="sidebar-item" activeClassName="active" to={linkTo}>
			{children}
		</NavLink>
	);
};

export default Sidebar;
export { SidebarItem };
