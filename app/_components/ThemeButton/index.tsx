"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineModeNight } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

export default function ThemeButton() {
	const { theme, resolvedTheme, setTheme } = useTheme();
	const [isTheme, setIsTheme] = useState<string | undefined>("");

	useEffect(() => {
		if (resolvedTheme === "system") {
			setIsTheme(theme);
		} else {
			setIsTheme(resolvedTheme);
		}
	}, [theme, resolvedTheme]);

	return (
		<div
			className="fixed bottom-4 right-4 size-5 z-50"
			onClick={() => setTheme(isTheme === "dark" ? "light" : "dark")}
			onKeyDown={() => setTheme(isTheme === "dark" ? "light" : "dark")}
		>
			{isTheme === "dark" ? (
				<MdOutlineWbSunny className="size-full" />
			) : (
				<MdOutlineModeNight className="size-full" />
			)}
		</div>
	);
}
