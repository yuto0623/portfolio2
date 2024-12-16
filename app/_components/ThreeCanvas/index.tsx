"use client";
import { ContactShadows, Float } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import { type RefObject, use, useEffect, useRef, useState } from "react";
import type { Group } from "three";
import BgEffect from "./BgEffect";
import Rig from "./Rig";
import RotatingTorus from "./RotatingTorus";
import TextEffect from "./TextEffect";
import WorksSlider from "./WorksSlider";

export default function ThreeCanvas() {
	const [page, setPage] = useQueryState("page");
	const [work, setWork] = useQueryState("work");
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
							<TextEffect
								fontSize={2}
								page={1}
								currentPage={Number.parseInt(page || "") || 1}
							>
								Portfolio
							</TextEffect>
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
					<Rig page={page} />
					<WorksRig work={work} worksRef={worksRef} />
				</Canvas>
			</div>
		</>
	);
}

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
