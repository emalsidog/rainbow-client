// Dependenices
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../redux/selectors/user-selector";

// Components
import Navbar from "./navbar";
import Sidebar, { SidebarItem } from "./sidebar";

// Types
interface LayoutProps {
	children: React.ReactNode;

	secondSidebar?: boolean;
	secondSidebarOptions?: Options[];
}

interface Options {
	title: string;

	linkTo: string;
	hashLink: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const {
		children,
		secondSidebar = false,
		secondSidebarOptions = undefined,
	} = props;

	const user = useSelector(selectUser);

	const secondSidebarRender = secondSidebarOptions?.map((options) => {
		return (
			<SidebarItem key={options.title} hashLink={options.hashLink} linkTo={options.linkTo}>
				<span>{options.title}</span>
			</SidebarItem>
		);
	});

	return (
		<React.Fragment>
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

				{secondSidebar && <Sidebar secondSidebar>{secondSidebarRender}</Sidebar>}
			</main>
		</React.Fragment>
	);
};

export default Layout;
