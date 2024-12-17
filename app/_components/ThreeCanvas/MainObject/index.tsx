import { getWindowSize } from "@/app/hooks/GetWindowSize";
import { ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

export default function MainObject({ page }: { page: number }) {
	const meshRefs = useRef<Mesh[]>([]);
	const { height, width } = getWindowSize();

	useFrame(() => {
		meshRefs.current.forEach((mesh, index) => {
			if (mesh?.material) {
				mesh.rotateX(0.005);
				mesh.rotateZ(0.005);
			}
			//ページが切り替わるとオブジェクトも切り替わる(透明度の変化)
			if (mesh?.material && "opacity" in mesh.material) {
				if (index === 0 && !page) {
					mesh.material.opacity += (1 - mesh.material.opacity) * 0.05;
				} else if (index + 1 === page) {
					mesh.material.opacity += (1 - mesh.material.opacity) * 0.05;
				} else {
					mesh.material.opacity += (0 - mesh.material.opacity) * 0.05;
				}
				mesh.material.needsUpdate = true;
				mesh.material.transparent = true;
			}

			//ウィンドウサイズによってオブジェクトの大きさを変更
			if (mesh?.material) {
				if (width < 768 && mesh.geometry.type === "TorusKnotGeometry") {
					mesh.scale.x += (0.5 - mesh.scale.x) * 0.05;
					mesh.scale.y += (0.5 - mesh.scale.y) * 0.05;
					mesh.scale.z += (0.5 - mesh.scale.z) * 0.05;
				} else if (width < 768 && mesh.geometry.type !== "TorusKnotGeometry") {
					mesh.scale.x += (0.7 - mesh.scale.x) * 0.05;
					mesh.scale.y += (0.7 - mesh.scale.y) * 0.05;
					mesh.scale.z += (0.7 - mesh.scale.z) * 0.05;
				} else if (width >= 768 && mesh.geometry.type === "TorusKnotGeometry") {
					mesh.scale.x += (0.7 - mesh.scale.x) * 0.05;
					mesh.scale.y += (0.7 - mesh.scale.y) * 0.05;
					mesh.scale.z += (0.7 - mesh.scale.z) * 0.05;
				} else {
					mesh.scale.x += (1 - mesh.scale.x) * 0.05;
					mesh.scale.y += (1 - mesh.scale.y) * 0.05;
					mesh.scale.z += (1 - mesh.scale.z) * 0.05;
				}
			}
		});
	});

	return (
		<>
			{[
				<torusGeometry key="torus" />,
				<icosahedronGeometry key="icosahedron" />,
				<sphereGeometry key="sphere" />,
				<torusKnotGeometry key="torusKnot" />,
			].map((geometry, index) => (
				<mesh
					key={geometry.key ?? `geometry-${index}`}
					ref={(el) => {
						if (el) {
							meshRefs.current[index] = el;
						}
					}}
					castShadow
					scale={geometry.key === "torusKnot" ? [0.7, 0.7, 0.7] : [1, 1, 1]}
				>
					{geometry}
					<MeshTransmissionMaterial
						// backside
						backsideThickness={1}
						thickness={0.2}
						depthTest={false}
						opacity={0}
					/>
				</mesh>
			))}
			<ContactShadows
				position-y={-2.0}
				opacity={0.7}
				scale={7}
				blur={2.4}
				color={"#000"}
				far={10}
				resolution={256}
			/>
		</>
	);
}
