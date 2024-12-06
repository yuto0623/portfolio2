import { useTexture } from "@react-three/drei";
import type { MeshProps } from "@react-three/fiber";

export default function WorksImg(props: MeshProps) {
	const texture = useTexture("/test.jpg");
	return (
		<mesh {...props}>
			<boxGeometry args={[1, 1, 0.05]} />
			<meshBasicMaterial map={texture} />
		</mesh>
	);
}
