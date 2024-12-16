import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

export default function ({
	children,
	fontSize,
	fillOpacity,
	page,
}: {
	children: React.ReactNode;
	fontSize: number;
	fillOpacity?: number;
	page?: number;
}) {
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const { theme, resolvedTheme } = useTheme();
	const textRef = useRef<Mesh>(null);
	const [targetOpacity, setTargetOpacity] = useState<number>(fillOpacity ?? 1);

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	useEffect(() => {
		setTargetOpacity(fillOpacity ?? 1);
	}, [fillOpacity]);

	useFrame(() => {
		if (textRef.current) {
			const material = textRef.current.material;
			if (material && "opacity" in material) {
				material.opacity += (targetOpacity - material.opacity) * 0.05;
				console.log(material.opacity);
			}
		}
	});

	return (
		<Text
			ref={textRef}
			color={isTheme === "dark" ? "#ffffff" : "#000000"}
			position={[0, 0, -1.5]}
			fontSize={fontSize}
			castShadow
		>
			{children}
		</Text>
	);
}
