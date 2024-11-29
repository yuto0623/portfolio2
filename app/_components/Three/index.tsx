"use client";
import {
	Edges,
	Float,
	MeshTransmissionMaterial,
	OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { GridHelper, type Mesh } from "three";

export default function Three() {
	return (
		<div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#ffffff]">
			<Canvas gl={{ antialias: true }}>
				<spotLight
					position={[20, 20, 10]}
					penumbra={1}
					castShadow
					angle={0.2}
				/>
				<ambientLight intensity={0.1} />
				<directionalLight color="red" position={[0, 0, 5]} />
				{/* <mesh>
					<boxGeometry args={[2, 2, 2]} />
					<meshStandardMaterial />
				</mesh> */}
				<Float floatIntensity={2}>
					<RotatingBox />
				</Float>
				<OrbitControls />
			</Canvas>
			<p className="text-3xl">aaaaaaaaaa</p>
		</div>
	);
}

const RotatingBox = () => {
	const meshRef = useRef<Mesh>(null);

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.x += 0.01;
			meshRef.current.rotation.y += 0.01;
		}
	});

	return (
		<mesh ref={meshRef}>
			<dodecahedronGeometry />
			<MeshTransmissionMaterial backside backsideThickness={2} thickness={1} />
			{/* <Edges scale={1} color={"black"} /> */}
		</mesh>
	);
};
