// Dependenices
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../redux/user/selector";

// Components
import Navbar from "./navbar";
import Sidebar, { SidebarItem } from "./sidebar";

// Types
interface LayoutProps {
	children: React.ReactNode;

	overlay?: boolean | null;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const {
		children,
		overlay = null,
	} = props;

	const user = useSelector(selectUser);

	return (
		<React.Fragment>
			{overlay && <div className="overlay"></div>}

			<Navbar />
			<main className="container">
				<Sidebar>
					<SidebarItem linkTo={`/${user.profileId}`}>
						<i className="fas fa-home fa-fw" />
						<span>Home</span>
					</SidebarItem>
					<SidebarItem linkTo="/friends">
						<i className="fas fa-user-friends fa-fw" />
						<span>Friends</span>
					</SidebarItem>
					<SidebarItem linkTo="/messenger">
						<i className="fas fa-envelope fa-fw" />
						<span>Messenger</span>
					</SidebarItem>
					<SidebarItem linkTo="/music">
						<i className="fas fa-music fa-fw" />
						<span>Music</span>
					</SidebarItem>
				</Sidebar>

				{children}

			</main>
		</React.Fragment>
	);
};

export default Layout;
