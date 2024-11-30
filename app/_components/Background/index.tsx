"use client";
import {
	ContactShadows,
	Edges,
	Float,
	MeshTransmissionMaterial,
	OrbitControls,
	TorusKnot,
} from "@react-three/drei";
import { Environment, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { GridHelper, Group, type Mesh } from "three";

export default function Background() {
	return (
		<>
			<div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#ffffff]">
				<Canvas
					gl={{ antialias: true }}
					camera={{ position: [0, 0, 5] }}
					shadows
				>
					<Environment preset="studio" />
					<color attach="background" args={["#ffffff"]} />
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
								color={"black"}
								fontSize={2}
								castShadow
							>
								AaaaAaaaa
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
					<OrbitControls />
				</Canvas>
			</div>
			<p className="text-3xl w-[100vw] h-[100vh] flex items-center justify-center">
				aaaaaaaaaa
			</p>
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
