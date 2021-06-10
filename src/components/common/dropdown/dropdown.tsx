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
	onClick: () => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
	const { children, avatar } = props;

	const [isVisible, setIsVisible] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsVisible((prev) => !prev);
	};

	useEffect(() => {
		const unsubscribe = eventListenters();
		return unsubscribe;
	});

	const eventListenters = () => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	};

	const handleClickOutside = (event: any): void => {
		if (ref.current && !ref.current.contains(event.target)) {
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
			{isVisible ? <div className="dd-list">{children}</div> : null}
		</div>
	);
};

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
	const { title, onClick } = props;
	return (
		<button onClick={onClick} className="dd-list-item">
			{title}
		</button>
	);
};

export const DropdownDivider: React.FC = () => {
	return <div className="dd-divider"></div>;
};

export default Dropdown;
