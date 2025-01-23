"use client";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";
import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";

export default function Button({
	children,
	type = "button",
	disabled = false,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
}) {
	const isTheme = useCustomTheme();

	return (
		<button
			type={type}
			disabled={disabled}
			{...props}
			className={`py-3 px-6 rounded-2xl transition-all duration-300 ${isTheme === "dark" ? "shadow-[5px_5px_10px_#252525,-5px_-5px_10px_#1a1a1a;] bg-black" : " shadow-[5px_5px_10px_#d6d6d6,-5px_-5px_10px_#ffffff;] bg-white"}`}
		>
			{children}
		</button>
	);
}
