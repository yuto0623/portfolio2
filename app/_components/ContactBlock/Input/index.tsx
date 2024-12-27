"use client";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";

type InputProps = {
	type: string;
	placeholder: string;
};

export default function Input({ type, placeholder }: InputProps) {
	const isTheme = useCustomTheme();
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={`py-3 px-6 rounded-2xl transition-all duration-300 ${isTheme === "dark" ? "shadow-[5px_5px_10px_#252525,-5px_-5px_10px_#1a1a1a;]" : " shadow-[5px_5px_10px_#d6d6d6,-5px_-5px_10px_#ffffff;]"}`}
		/>
	);
}
