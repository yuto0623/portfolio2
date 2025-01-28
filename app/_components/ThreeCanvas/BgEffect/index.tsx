import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Color } from "three";

export default function BgEffect() {
	const { theme, resolvedTheme } = useTheme();
	const initialTheme = resolvedTheme === "system" ? theme : resolvedTheme;
	const [isTheme, setIsTheme] = useState<string | undefined>(initialTheme);
	const bgRef = useRef(new Color(initialTheme === "dark" ? 0 : 1));

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
