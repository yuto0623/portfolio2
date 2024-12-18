import { useEffect, useState } from "react";

export const useIsTouchDevice = () => {
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		const checkTouchDevice = () => {
			if (typeof window !== "undefined") {
				const hasTouchEvent = "ontouchstart" in window;
				const hasTouchPoints = navigator.maxTouchPoints > 0;
				const hasPointerCoarse = window.matchMedia("(pointer:coarse)").matches;
				setIsTouchDevice(hasTouchEvent || hasTouchPoints || hasPointerCoarse);
			}
		};

		checkTouchDevice();
	}, []);

	return isTouchDevice;
};
