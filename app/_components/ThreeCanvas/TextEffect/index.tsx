"use client";
import { getWindowSize } from "@/app/hooks/GetWindowSize";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

export default function ({
	children,
	page,
	currentPage,
	position,
	rotation,
}: {
	children: React.ReactNode;
	page?: number;
	currentPage?: number;
	position: [number, number, number];
	rotation?: [number, number, number];
}) {
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const { theme, resolvedTheme } = useTheme();
	const textRef = useRef<Mesh>(null);
	const [targetOpacity, setTargetOpacity] = useState<number>(0);
	const { height, width } = getWindowSize();

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	//該当のページのみ透明度を1にする
	useEffect(() => {
		if (currentPage === page) {
			setTargetOpacity(1);
		} else {
			setTargetOpacity(0);
		}
	}, [currentPage, page]);

	useEffect(() => {
		//初期状態を透明にする
		if (textRef.current) {
			const material = textRef.current.material;
			if (material && "opacity" in material) {
				material.opacity = 0;
			}
			if (material && "depthTest" in material) {
				material.depthTest = false;
			}
		}
	}, []);

	useFrame(() => {
		//レスポンシブ対応
		if (textRef.current) {
			const material = textRef.current.material;
			if (material && "opacity" in material) {
				material.opacity += (targetOpacity - material.opacity) * 0.05;
				// console.log(material.opacity);
			}
		}
		if (width < 768) {
			if (textRef.current && "fontSize" in textRef.current) {
				(textRef.current as unknown as { fontSize: number }).fontSize +=
					(1 - (textRef.current as unknown as { fontSize: number }).fontSize) *
					0.05;
			}
		} else if (width >= 768) {
			if (textRef.current && "fontSize" in textRef.current) {
				(textRef.current as unknown as { fontSize: number }).fontSize +=
					(2 - (textRef.current as unknown as { fontSize: number }).fontSize) *
					0.05;
			}
		}

		//ページが切り替わるとTextが移動する
		if (textRef.current?.position) {
			if (2 === page) {
				gsap.to(textRef.current.position, { x: 0, y: 0, z: 3, duration: 1 });
			} else {
				gsap.to(textRef.current.position, {
					x: position[0],
					y: position[1],
					z: position[2],
					duration: 1,
				});
			}
		}
	});

	return (
		<Text
			ref={textRef}
			color={isTheme === "dark" ? "#ffffff" : "#000000"}
			position={position}
			fontSize={2}
			rotation={rotation}
			castShadow
		>
			{children}
		</Text>
	);
}
