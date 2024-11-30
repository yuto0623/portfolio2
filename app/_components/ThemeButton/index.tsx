"use client";
import { useTheme } from "next-themes";
import { MdOutlineModeNight } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

export default function ThemeButton() {
	const { theme, setTheme } = useTheme();

	return (
		<div
			className="fixed bottom-4 right-4 size-5 z-50"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			onKeyDown={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<MdOutlineWbSunny className="size-full" />
			) : (
				<MdOutlineModeNight className="size-full" />
			)}
		</div>
	);
}
