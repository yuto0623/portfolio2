import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { Color } from "three";
import { gsap } from "gsap";

export default function BgEffect() {
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const { theme, resolvedTheme } = useTheme();
	const bgRef = useRef<Color>(null);

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);

		if (bgRef.current) {
			gsap.to(bgRef.current, {
				duration: 0.3,
				r: currentTheme === "dark" ? 0 : 1,
				g: currentTheme === "dark" ? 0 : 1,
				b: currentTheme === "dark" ? 0 : 1,
			});
		}
	}, [theme, resolvedTheme]);
	return (
		<color
			attach="background"
			// args={[`${isTheme === "dark" ? "#000000" : "#ffffff"}`]}
			ref={bgRef}
		/>
	);
}
