// Dependencies
import { useState, useEffect, useCallback } from "react";

export const useContextMenu = (outerRef) => {
	const [xPos, setXPos] = useState<number>(0);
	const [yPos, setYPos] = useState<number>(0);
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handleContextMenu = useCallback(
		(e: any) => {
			e.preventDefault();
			if (outerRef && outerRef.current.contains(e.target)) {
				setXPos(e.pageX);
				setYPos(e.pageY);
				setShowMenu(true);
			} else {
				setShowMenu(false);
			}
		},
		[setXPos, setYPos, outerRef]
	);

	const handleClick = useCallback(() => {
		showMenu && setShowMenu(false);
	}, [showMenu]);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);
		};
	}, [handleClick, handleContextMenu]);

	return { xPos, yPos, showMenu };
};
