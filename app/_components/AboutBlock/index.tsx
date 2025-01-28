"use client";
import { useEffect, useState } from "react";
import GlassContainer from "../GlassContainer";

export default function AboutBlock() {
	const [isHidden, setIsHidden] = useState(true);

	useEffect(() => {
		setIsHidden(false);
	});

	return (
		<GlassContainer
			className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[600px] w-[80%] mx-auto ${isHidden ? "hidden" : "block"}`}
		>
			<div className="mb-12">
				<ruby>新谷 悠人</ruby>
				<h2 className="text-2xl font-bold">YUTO SHINTANI</h2>
			</div>
			<div className="leading-8 tracking-wider">
				<p>2001年生まれの23歳。広島県在住。</p>
				<p>
					広島コンピュータ専門学校でHTML、CSS、Photoshop、Illustratorの基礎を学び、以降独学でJavascript、PHP、React、Next.jsを学んでいます。
				</p>
				<p>その他にも3DCG関係やスマホアプリ開発、写真等にも興味があります。</p>
				<p>現在の会社ではWEB関係を担当。</p>
				<p>趣味はプログラミング、ゲーム、ツーリング、ドライブ、写真。</p>
			</div>
		</GlassContainer>
	);
}
