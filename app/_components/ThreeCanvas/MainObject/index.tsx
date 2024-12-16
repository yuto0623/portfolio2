import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Mesh } from "three";

export default function MainObject({ page }: { page: number }) {
	const meshRefs = useRef<Mesh[]>([]);

	useFrame(() => {
		meshRefs.current.forEach((mesh, index) => {
			if (mesh?.material) {
				mesh.rotateX(0.005);
				mesh.rotateZ(0.005);
			}

			if (mesh?.material && "opacity" in mesh.material) {
				if (index + 1 === page) {
					mesh.material.opacity += (1 - mesh.material.opacity) * 0.05;
				} else {
					mesh.material.opacity += (0 - mesh.material.opacity) * 0.05;
				}
				mesh.material.needsUpdate = true;
				mesh.material.transparent = true;
			}
		});
	});

	return (
		<>
			{[
				<torusGeometry key="torus" />,
				<icosahedronGeometry key="icosahedron" />,
				<sphereGeometry key="sphere" />,
				<torusKnotGeometry key="box" />,
			].map((geometry, index) => (
				<mesh
					key={geometry.key ?? `geometry-${index}`}
					ref={(el) => {
						if (el) {
							meshRefs.current[index] = el;
						}
					}}
					castShadow
				>
					{geometry}
					<MeshTransmissionMaterial
						backside
						backsideThickness={1}
						thickness={0.2}
						depthTest={false}
					/>
				</mesh>
			))}
		</>
	);
}
