// Dependencies
import React, { useState, useEffect, useRef } from "react";

// Styles
import "./dropdown.css";

// Types
interface DropdownProps {
	children: React.ReactNode;
	avatar?: string;
}

interface DropdownItemProps {
	title: string;
	isLoading?: boolean;
	onClick: () => void;
}

// Dropdown
const Dropdown: React.FC<DropdownProps> = (props) => {
	const { children, avatar } = props;

	const [isVisible, setIsVisible] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	// Handle click
	const handleClick = () => {
		setIsVisible((prev) => !prev);
	};

	// Subscribing to events
	useEffect(() => {
		const unsubscribe = eventListenters();
		return unsubscribe;
	});

	// Events
	const eventListenters = () => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	};

	// Handle click outside
	const handleClickOutside = (event: any): void => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsVisible(false);
		} else if (ref.current && ref.current.contains(event.target) && event.target.nodeName === "BUTTON") {
			setIsVisible(false);
		}
	};

	return (
		<div className="dd-wrapper" ref={ref}>
			<div onClick={handleClick} className="dd-header">
				{avatar ? (
					<img src={avatar} alt="You" />
				) : (
					<i className="fas fa-chevron-down"></i>
				)}
			</div>
			{isVisible ? (
				<div className="dd-list">
					{children}
				</div>
			) : null}
		</div>
	);
};

// Item
export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
	const { title, onClick, isLoading } = props;

	let classNames = `dd-list-item ${isLoading ? "disabled" : ""}`;
	return (
		<button disabled={isLoading} onClick={onClick} className={classNames}>
			{title}
		</button>
	);
};

// Divider
export const DropdownDivider: React.FC = () => {
	return <div className="dd-divider"></div>;
};

export default Dropdown;
