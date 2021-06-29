// Dependenices
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import {
	selectRequestsCounter,
	selectUser,
} from "../../../redux/user/selector";

// Components
import Navbar from "./navbar";
import Sidebar, { SidebarItem } from "./sidebar";

// Styles
import styles from "./layout.module.css";

// Types
interface LayoutProps {
	children: React.ReactNode;

	overlay?: boolean | null;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const { children, overlay = null } = props;

	const user = useSelector(selectUser);
	const requestsCount = useSelector(selectRequestsCounter);

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
					<SidebarItem linkTo="/people/search">
						<div>
							<i className="fas fa-user-friends fa-fw" />
							<span>People</span>
						</div>
						{requestsCount > 0 && (
							<div className={styles.blinker}>
								<i className="fas fa-exclamation"></i>
							</div>
						)}
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
