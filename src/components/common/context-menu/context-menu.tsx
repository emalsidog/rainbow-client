// Dependencies
import React from "react";

// Hooks
import { useContextMenu } from "../../../hocs/useContextMenu";
import useWindowSize from "../../../hocs/useWindowsSize";

// Styles
import styles from "./context-menu.module.css";

// Types
interface ContextMenuProps {
	children?: React.ReactNode;
	outerRef: React.ReactNode | null;
}

interface ContextMenuItemProps {
	label?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, outerRef }) => {
	const { xPos, yPos, showMenu } = useContextMenu(outerRef);

	const { width, height } = useWindowSize();

	let right: number = 0;
	let top: number = 0;

	// 200 - width of context menu
	if (xPos + 200 > width - 100) {
		right = width - 250;
	} else {
		right = xPos;
	}

	// If context menu
	if (yPos + 100 > height - 100) {
		top = height - 180;
	} else {
		top = yPos;
	}

	if (showMenu) {
		return (
			<div
				style={{
					top: top,
					left: right,
				}}
				className={styles.wrapper}
			>
				{children}
			</div>
		);
	} else {
		return null;
	}
};

export const ContextMenuItem: React.FC<ContextMenuItemProps> = (props) => {
	const { label, children, onClick } = props;

	return (
		<button className={styles.menuItem} onClick={onClick}>
			{label ? label : children ? children : "No label"}
		</button>
	);
};

export default ContextMenu;
