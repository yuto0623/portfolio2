import { useTexture } from "@react-three/drei";

export default function WorksImg() {
	const texture = useTexture("/test.jpg");
	return (
		<mesh position={[0, -2, 0]}>
			<boxGeometry args={[1, 1, 0.05]} />
			<meshBasicMaterial map={texture} />
		</mesh>
	);
}
