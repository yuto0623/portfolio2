import type { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
	const { name, email, message } = await req.json();

	// SMTPトランスポートを使用してトランスポーターオブジェクトを作成
	const transporter = nodemailer.createTransport({
		service: "gmail",
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_USER, // メールアドレスを設定
			pass: process.env.MAIL_PASS, // メールパスワードを設定
		},
	});

	// メール設定データの準備
	const mailOptions = {
		from: '"Yuto Shintani" <yuto.ryr0623@gmail.com>', // 送信者名とメールアドレスを設定
		to: `"${name}" <${email}>`, // 送信先名とメールアドレスを設定
		subject: "お問い合わせ確認メール(自動送信)", // 件名を設定
		text: message,
	};

	//自分に送信するメールの設定
	const mailOptionsToMe = {
		from: '"Yuto Shintani" <yuto.ryr0623@gmail.com>',
		to: "yuto.ryr0623@gmail.com",
		replyTo: `"${name}" <${email}>`,
		subject: "お問い合わせがありました",
		text: message,
	};

	try {
		// メール送信
		const info = await transporter.sendMail(mailOptions);
		const infoToMe = await transporter.sendMail(mailOptionsToMe);
		return new Response(
			JSON.stringify({ message: "メール送信完了", info, infoToMe }),
			{
				status: 200,
			},
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Error sending email", error }),
			{ status: 500 },
		);
	}
}
