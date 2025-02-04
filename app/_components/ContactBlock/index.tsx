"use client";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";
import { type FormEvent, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { DNA } from "react-loader-spinner";
import TextareaAutosize from "react-textarea-autosize";
import GlassContainer from "../GlassContainer";
import Button from "./Button";

type Inputs = {
	name: string;
	email: string;
	message: string;
};

export default function ContactBlock() {
	const isTheme = useCustomTheme();
	const [isSending, setIsSending] = useState(false);
	const [isHidden, setIsHidden] = useState(true);

	useEffect(() => {
		setIsHidden(false);
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setIsSending(true);
		console.log(data);
		try {
			const response = await fetch("/api/mail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					message: `
このメールは自動送信です。
以下の内容でお問い合わせを受け付けました。
メールにてご連絡いたしますので、お待ちください。

お名前: ${data.name}
メールアドレス: ${data.email}
お問い合わせ内容: ${data.message}

---------------------------
新谷 悠人
Email: yuto.ryr0623@gmail.com
---------------------------
`,
				}),
			});
			setIsSending(false);
			if (!response.ok) throw new Error("送信に失敗しました");
		} catch (error) {
			setIsSending(false);
			console.error(error);
		}
	};

	return (
		<GlassContainer
			className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[600px] w-[80%] mx-auto ${isHidden ? "hidden" : "block"}`}
		>
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
				<Button type="submit" disabled={isSending}>
					{isSending ? (
						<div className="flex justify-center">
							Sending...
							<DNA
								visible={true}
								height="30"
								width="80"
								ariaLabel="dna-loading"
								wrapperStyle={{}}
								wrapperClass="dna-wrapper"
							/>
						</div>
					) : (
						"Send"
					)}
				</Button>
			</form>
		</GlassContainer>
	);
}
