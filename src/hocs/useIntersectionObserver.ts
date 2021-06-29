import { useState, useCallback } from "react";

export const useIntersectionObserver = () => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

	const callback = useCallback((entries) => {
		if (entries[0].isIntersecting) {
			setIsIntersecting(true);
		} else {
			setIsIntersecting(false);
		}
	}, []);

	const ref: (node: any) => void = useCallback(
		(node) => {
			if (!node) return;
			const observer = new IntersectionObserver(callback);
			observer.observe(node);
		},
		[callback]
	);

	return { isIntersecting, ref };
};
