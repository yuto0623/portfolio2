import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineArrowLongDown } from "react-icons/hi2";

export default function Scroll({ page }: { page: number }) {
	const { theme, resolvedTheme } = useTheme();
	const [isTheme, setIsTheme] = useState<string | undefined>("");

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	return (
		<div
			className={`absolute left-5 bottom-10 [writing-mode:vertical-rl] text-sm transition-all 
							md:bottom-1/2 md:translate-y-1/2 
							 ${page === 1 ? "opacity-100 duration-[2000ms]" : "opacity-0 -translate-x-full duration-300"}`}
		>
			Scroll
			<span
				className={`absolute top-0 left-0 h-[140%] w-0.5 transition-all duration-[2000ms] ${isTheme === "dark" ? "bg-white" : "bg-black"}`}
			/>
			<span className="absolute -bottom-[25px] left-0 h-5 w-5 animate-bounce text-lg">
				<HiOutlineArrowLongDown />
			</span>
		</div>
	);
}
