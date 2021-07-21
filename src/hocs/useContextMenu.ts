// Dependencies
import { useState, useEffect, useCallback } from "react";

export const useContextMenu = (outerRef) => {
	const [xPos, setXPos] = useState<number>(0);
	const [yPos, setYPos] = useState<number>(0);
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const [timerId, setTimerId] = useState<number>(0);

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

	const handleTouchStart = useCallback((e: any): void => {
		if (outerRef && outerRef.current.contains(e.target)) {
			const id: number = window.setTimeout(() => {
				setShowMenu(true);
				setXPos(e.changedTouches[0].clientX);
				setYPos(e.changedTouches[0].clientY);
			}, 100);
	
			setTimerId(id)
		} else {
			setShowMenu(false);
		}
	}, [setXPos, setYPos, outerRef])

	const handleTouchEnd = useCallback((): void => {
		timerId && clearTimeout(timerId);
	}, [timerId])

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);

		document.addEventListener("touchstart", handleTouchStart);
		document.addEventListener("touchend", handleTouchEnd);

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);

			document.removeEventListener("touchstart", handleTouchStart);
			document.removeEventListener("touchend", handleTouchEnd);
		};
	}, [handleClick, handleContextMenu, handleTouchStart, handleTouchEnd]);

	return { xPos, yPos, showMenu };
};
