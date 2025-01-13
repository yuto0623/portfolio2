"use client";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";
import TextareaAutosize from "react-textarea-autosize";

type TextAreaProps = {
	placeholder: string;
};

export default function TextArea({ placeholder }: TextAreaProps) {
	const isTheme = useCustomTheme();
	return (
		<TextareaAutosize
			placeholder={placeholder}
			minRows={3}
			maxRows={10}
			className={`py-3 px-6 rounded-2xl transition-all duration-300 w-full resize-none ${
				isTheme === "dark"
					? "shadow-[5px_5px_10px_#252525,-5px_-5px_10px_#1a1a1a;] bg-black"
					: "shadow-[5px_5px_10px_#d6d6d6,-5px_-5px_10px_#ffffff;] bg-white"
			}`}
		/>
	);
}
