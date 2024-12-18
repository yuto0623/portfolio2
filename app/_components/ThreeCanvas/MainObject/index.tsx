import { getWindowSize } from "@/app/hooks/getWindowSize";
import { ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
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
			if (mesh?.material && "opacity" in mesh.material) {
				//ページが切り替わるとオブジェクトも切り替わる(透明度の変化)
				if (index === 0 && !page) {
					gsap.to(mesh.material, { opacity: 1, duration: 1 });
				} else if (index + 1 === page) {
					gsap.to(mesh.material, { opacity: 1, duration: 1 });
				} else {
					gsap.to(mesh.material, { opacity: 0, duration: 1 });
				}
				mesh.material.needsUpdate = true;
				mesh.material.transparent = true;
			}

			//ページが切り替わるとオブジェクトが移動する
			if (mesh?.position) {
				if (2 === page) {
					if (width < 768) {
						gsap.to(mesh.position, { x: 0, y: 2.5, z: 0, duration: 1 });
					} else {
						gsap.to(mesh.position, {
							x: 0,
							y: 0,
							z: width * 0.002,
							duration: 1,
						});
					}
				} else {
					gsap.to(mesh.position, { x: 0, y: 0, z: 0, duration: 1 });
				}
			}

			if (mesh?.geometry) {
				//ウィンドウサイズによってオブジェクトの大きさを変更
				if (width < 1024 && mesh.geometry.type === "TorusKnotGeometry") {
					gsap.to(mesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.8 });
				} else if (width < 1024 && mesh.geometry.type !== "TorusKnotGeometry") {
					gsap.to(mesh.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 0.8 });
				} else if (
					width >= 1024 &&
					mesh.geometry.type === "TorusKnotGeometry"
				) {
					gsap.to(mesh.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 0.8 });
				} else {
					gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.8 });
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
				scale={20}
				blur={2.4}
				color={"#000"}
				far={10}
				resolution={256}
			/>
		</>
	);
}
