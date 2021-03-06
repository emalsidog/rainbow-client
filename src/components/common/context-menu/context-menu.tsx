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
	additionalShowFlag?: boolean;
}

interface ContextMenuItemProps {
	label?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, outerRef, additionalShowFlag = true }) => {
	const { xPos, yPos, showMenu } = useContextMenu(outerRef);

	const { width, height } = useWindowSize();

	let right: number = 0;
	let top: number = 0;

	// 250 - width of context menu
	if (xPos + 250 > width - 100) {
		right = width - 250;
	} else {
		right = xPos;
	}

	if (yPos + 100 > height - 100) {
		top = height - 180;
	} else {
		top = yPos;
	}

	if (showMenu && additionalShowFlag) {
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
		<button className={styles.menuItem} onClick={onClick} onTouchStart={onClick}>
			{label ? label : children ? children : "No label"}
		</button>
	);
};

export default ContextMenu;
