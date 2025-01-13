import { type FormEvent, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";

export default function ContactBlock() {
	const [formData, setFormData] = useState({
		name: "name",
		email: "yuto.ryr0623@gmail.com",
		message: "そうしんてすとおお",
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/mail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (!response.ok) throw new Error("送信に失敗しました");
			// 成功時の処理
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2 className="text-3xl mb-6">CONTACT</h2>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<Input type="text" placeholder="Name" />
				<Input type="email" placeholder="Email" />
				<TextArea placeholder="Message" />
				<Button type="submit">Send</Button>
			</form>
		</div>
	);
}
