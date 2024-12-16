import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function Rig({ page }: { page: string | null }) {
	const { camera } = useThree();
	const initialRadianRef = useRef(((1 * 2.5) / 10) * Math.PI * 2);
	const currentRadianRef = useRef(initialRadianRef.current);

	return useFrame(() => {
		// Only interpolate if page is not null
		if (page) {
			const targetRadian =
				(((Number.parseInt(page) - 2) * 2.5) / 10) * Math.PI * 2;
			currentRadianRef.current +=
				(-targetRadian - currentRadianRef.current) * 0.05;
		}

		camera.position.x = Math.cos(currentRadianRef.current) * 5;
		camera.position.z = Math.sin(currentRadianRef.current) * 5;

		// console.log(camera.position);
		camera.lookAt(0, 0, 0);
	});
}
