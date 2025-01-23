"use client";
import { type FormEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";

type Inputs = {
	name: string;
	email: string;
	message: string;
};

export default function ContactBlock() {
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
				<Input
					type="text"
					placeholder="Name"
					{...register("name", { required: true })}
				/>
				<Input
					type="email"
					placeholder="Email"
					{...register("email", { required: true })}
				/>
				<TextArea
					placeholder="Message"
					{...register("message", { required: true })}
				/>
				<Button type="submit">Send</Button>
			</form>
		</div>
	);
}
