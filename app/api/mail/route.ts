import type { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
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
		to: "yuto.ryr0623@ezweb.ne.jp",
		subject: "test",
		text: "hello",
	};

	try {
		// メール送信
		const info = await transporter.sendMail(mailOptions);
		return new Response(JSON.stringify({ message: "メール送信完了", info }), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Error sending email", error }),
			{ status: 500 },
		);
	}
}
