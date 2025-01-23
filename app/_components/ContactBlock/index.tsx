"use client";
import { type FormEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";
import TextareaAutosize from "react-textarea-autosize";

type Inputs = {
	name: string;
	email: string;
	message: string;
};

export default function ContactBlock() {
	const isTheme = useCustomTheme();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const [formData, setFormData] = useState({
		name: "name",
		email: "yuto.ryr0623@gmail.com",
		message: "そうしんてすとおお",
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log("submit");
		console.log(data);
		// try {
		// 	const response = await fetch("/api/mail", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(formData),
		// 	});
		// 	if (!response.ok) throw new Error("送信に失敗しました");
		// 	// 成功時の処理
		// } catch (error) {
		// 	console.error(error);
		// }
	};

	return (
		<div>
			<h2 className="text-3xl mb-6">CONTACT</h2>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Name"
					{...register("name", { required: true })}
					className={`py-3 px-6 rounded-2xl transition-all duration-300 ${
						isTheme === "dark"
							? "shadow-[5px_5px_10px_#252525,-5px_-5px_10px_#1a1a1a;] bg-black"
							: "shadow-[5px_5px_10px_#d6d6d6,-5px_-5px_10px_#ffffff;] bg-white"
					}`}
				/>
				{errors.name && <span>This field is required</span>}
				<input
					type="email"
					placeholder="Email"
					{...register("email", { required: true })}
					className={`py-3 px-6 rounded-2xl transition-all duration-300 ${
						isTheme === "dark"
							? "shadow-[5px_5px_10px_#252525,-5px_-5px_10px_#1a1a1a;] bg-black"
							: "shadow-[5px_5px_10px_#d6d6d6,-5px_-5px_10px_#ffffff;] bg-white"
					}`}
				/>
				{errors.email && <span>This field is required</span>}
				<TextareaAutosize
					placeholder="Message"
					minRows={3}
					maxRows={10}
					{...register("message", { required: true })}
					className={`py-3 px-6 rounded-2xl transition-all duration-300 w-full resize-none ${
						isTheme === "dark"
							? "shadow-[5px_5px_10px_#252525,-5px_-5px_10px_#1a1a1a;] bg-black"
							: "shadow-[5px_5px_10px_#d6d6d6,-5px_-5px_10px_#ffffff;] bg-white"
					}`}
				/>
				{errors.message && <span>This field is required</span>}
				<Button type="submit">Send</Button>
			</form>
		</div>
	);
}
