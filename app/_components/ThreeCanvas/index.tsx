"use client";
import {
	ContactShadows,
	Edges,
	Float,
	MeshTransmissionMaterial,
	OrbitControls,
	PerspectiveCamera,
	Scroll,
	ScrollControls,
	TorusKnot,
	useTexture,
} from "@react-three/drei";
import { Environment, Text } from "@react-three/drei";
import {
	Canvas,
	type GroupProps,
	type MeshProps,
	useFrame,
	useLoader,
	useThree,
} from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import { type RefObject, use, useEffect, useRef, useState } from "react";
import {
	CanvasTexture,
	type Color,
	GridHelper,
	type Group,
	type Mesh,
	TextureLoader,
} from "three";
import BgEffect from "./BgEffect";
import RotatingTorus from "./RotatingTorus";
import Img from "./WorksImg";
import WorksImg from "./WorksImg";
import WorksSlider from "./WorksSlider";

export default function ThreeCanvas() {
	const [page, setPage] = useQueryState("page");
	const [work, setWork] = useQueryState("work");
	const { theme, resolvedTheme } = useTheme();
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const worksRef = useRef<Group>(null);

	return (
		<>
			<div className="w-[100vw] h-[100vh] fixed top-0 left-0 -z-10">
				<Canvas
					gl={{ antialias: true }}
					shadows
					camera={{ position: [0, 0, 5] }}
				>
					<BgEffect />
					<Environment preset="studio" />
					<ambientLight intensity={0.1} />
					<spotLight
						position={[20, 20, 10]}
						penumbra={1}
						castShadow
						angle={0.2}
					/>
					<directionalLight color={"white"} position={[0, 5, 5]} castShadow />
					<group>
						<Float floatIntensity={2} castShadow>
							<TextEffect fontSize={2}>Portfolio</TextEffect>
							<ContactShadows
								position-y={-2.0}
								opacity={0.7}
								scale={7}
								blur={2.4}
								color={"#000"}
								far={10}
								resolution={256}
							/>
							<RotatingTorus />
						</Float>
					</group>
					<group position={[-3, -7, 0]}>
						<Float floatIntensity={2} castShadow>
							<TextEffect fontSize={1}>Works</TextEffect>
						</Float>
						<group ref={worksRef}>
							<WorksSlider />
						</group>
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
					<WorksRig work={work} worksRef={worksRef} />
					{/* <FollowMouseLight /> */}
				</Canvas>
			</div>
		</>
	);
}

const Rig = ({ page }: { page: string | null }) => {
	const { camera } = useThree();
	const target = (Number.parseInt(page || "1") - 1) * -10;
	return useFrame(() => {
		camera.position.y += (target - camera.position.y) * 0.05;
	});
};

const WorksRig = ({
	work,
	worksRef,
}: { work: string | null; worksRef: RefObject<Group> }) => {
	const { camera } = useThree();
	const target = (Number.parseInt(work || "1") - 1) * -10;
	return useFrame(() => {
		if (!worksRef.current) return;
		worksRef.current.position.x +=
			(target - worksRef.current.position.x) * 0.05;
	});
};

// const FollowMouseLight = () => {
// 	const { pointer } = useThree();
// 	return useFrame(() => {
// 		console.log(pointer);
// 	});
// };

const TextEffect = ({
	children,
	fontSize,
}: { children: React.ReactNode; fontSize: number }) => {
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const { theme, resolvedTheme } = useTheme();

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	return (
		<Text
			color={isTheme === "dark" ? "#ffffff" : "#000000"}
			position={[0, 0, -1.5]}
			fontSize={fontSize}
			castShadow
		>
			{children}
		</Text>
	);
};
