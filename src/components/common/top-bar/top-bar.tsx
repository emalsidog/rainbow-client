// Dependencies
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

// Styles
import "./top-bar.css";

const TopBar: React.FC = () => {

    const indicator = useRef<HTMLSpanElement>(null)

	function handleIndicator(e: any) {        
		if (indicator.current) {
			indicator.current.style.width = `${e.target.offsetWidth}px`;
			indicator.current.style.left = `${e.target.offsetLeft}px`;
		}
	}

	return (
		<div className="topbar-container">
			<NavLink
				onClick={handleIndicator}
				to="/profile"
				activeClassName="is-active"
				className="topbar-item"
			>
				Profile
			</NavLink>
			<NavLink
				onClick={handleIndicator}
				to="/settings"
				activeClassName="is-active"
				className="topbar-item"
			>
				Settings
			</NavLink>
			<NavLink
				onClick={handleIndicator}
				to="/fri"
				activeClassName="is-active"
				className="topbar-item"
			>
				Testimonials
			</NavLink>
			<NavLink
				onClick={handleIndicator}
				to="/frie"
				activeClassName="is-active"
				className="topbar-item"
			>
				Blog
			</NavLink>
			<NavLink
				onClick={handleIndicator}
				to="/frien"
				activeClassName="is-active"
				className="topbar-item"
			>
				Contact
			</NavLink>
			<span ref={indicator} className="topbar-indicator"></span>
		</div>
	);
};

export default TopBar;
