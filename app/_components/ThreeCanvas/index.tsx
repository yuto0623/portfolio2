"use client";
import {
	ContactShadows,
	Edges,
	Float,
	MeshTransmissionMaterial,
	OrbitControls,
	PerspectiveCamera,
	TorusKnot,
} from "@react-three/drei";
import { Environment, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import { use, useEffect, useRef, useState } from "react";
import { type Color, GridHelper, Group, type Mesh } from "three";

export default function ThreeCanvas() {
	const [page, setPage] = useQueryState("page");
	const { theme, resolvedTheme } = useTheme();
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const bgRef = useRef<Color>(null);

	useEffect(() => {
		if (resolvedTheme === "system") {
			setIsTheme(theme);
		} else {
			setIsTheme(resolvedTheme);
		}
		console.log(theme);
		console.log(resolvedTheme);
	}, [theme, resolvedTheme]);

	useEffect(() => {
		if (bgRef.current && isTheme) {
			gsap.to(bgRef.current, {
				duration: 0.3,
				r: isTheme === "dark" ? 0 : 1,
				g: isTheme === "dark" ? 0 : 1,
				b: isTheme === "dark" ? 0 : 1,
			});
		}
	}, [isTheme]);

	return (
		<>
			<div className="w-[100vw] h-[100vh] fixed top-0 left-0 -z-10">
				<Canvas
					gl={{ antialias: true }}
					shadows
					camera={{ position: [0, 0, 5] }}
				>
					<Environment preset="studio" />
					<color
						attach="background"
						// args={[`${isTheme === "dark" ? "#000000" : "#ffffff"}`]}
						ref={bgRef}
					/>
					<spotLight
						position={[20, 20, 10]}
						penumbra={1}
						castShadow
						angle={0.2}
					/>
					<ambientLight intensity={0.1} />
					<directionalLight color={"white"} position={[0, 5, 5]} castShadow />
					<group>
						<Float floatIntensity={2} castShadow>
							<Text
								position={[0, 0, -1.5]}
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								fontSize={2}
								castShadow
							>
								Portfolio
							</Text>
							<ContactShadows
								position-y={-2.0}
								opacity={0.7}
								scale={7}
								blur={2.4}
								color={"#000"}
								far={10}
								resolution={256}
							/>
							<RotatingBox />
						</Float>
					</group>
					{/* <Physics>
						<RigidBody position={[-3, 2, 0]}>
							<TorusKnot scale={0.5}>
								<meshStandardMaterial color="#ccc" />
							</TorusKnot>
						</RigidBody>
						<CuboidCollider position={[0, -2.5, 0]} args={[10, 1, 10]} />
					</Physics> */}
					{/* <OrbitControls /> */}
					<Rig page={page} />
					{/* <FollowMouseLight /> */}
				</Canvas>
			</div>
		</>
	);
}

const RotatingBox = () => {
	const meshRef = useRef<Mesh>(null);

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.x += 0.003;
			meshRef.current.rotation.y += 0.003;
		}
	});

	return (
		<mesh ref={meshRef} castShadow>
			<torusGeometry />
			<MeshTransmissionMaterial
				backside
				backsideThickness={1}
				thickness={0.2}
			/>
		</mesh>
	);
};

const Rig = ({ page }: { page: string | null }) => {
	const { camera } = useThree();
	const target = (Number.parseInt(page || "1") - 1) * -10;
	return useFrame(() => {
		camera.position.y += (target - camera.position.y) * 0.05;
	});
};

// const FollowMouseLight = () => {
// 	const { pointer } = useThree();
// 	return useFrame(() => {
// 		console.log(pointer);
// 	});
// };
