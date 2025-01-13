import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { to, subject, text } = req.body;

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
			res.status(200).json({ message: "メール送信完了", info });
		} catch (error) {
			res.status(500).json({ message: "Error sending email", error });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
