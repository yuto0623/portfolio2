import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export default function RotatingTorus() {
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
}
