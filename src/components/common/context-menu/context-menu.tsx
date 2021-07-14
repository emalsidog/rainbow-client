// Dependencies
import React from "react";

// Hooks
import { useContextMenu } from "../../../hocs/useContextMenu";
// import useWindowSize from "../../../hocs/useWindowsSize";

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

	if (showMenu) {
		return (
			<div
				style={{
					top: yPos,
					left: xPos,
					// transform: `translateX(min(${xPos}, calc(100vw - 100%)))
					// translateY(min(${}, calc(100vh - 100%)));`
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
