// Dependenices
import React from "react";

// Components
import Navbar from "./navbar";
import Sidebar from "./sidebar";

// Types
interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />
			<main className="container">
				<Sidebar />
				{children}
			</main>
		</React.Fragment>
	);
};

export default Layout;
