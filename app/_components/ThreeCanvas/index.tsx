"use client";
import { ContactShadows, Float } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useQueryState } from "nuqs";
import { Perf } from "r3f-perf";
import { type RefObject, use, useEffect, useRef, useState } from "react";
import type { Group } from "three";
import BgEffect from "./BgEffect";
import MainObject from "./MainObject";
import Rig from "./Rig";
import TextEffect from "./TextEffect";

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
					dpr={[1, 1.5]}
				>
					{/* <Perf /> */}
					<BgEffect />
					<Environment preset="studio" />
					<ambientLight intensity={0.1} />
					<spotLight position={[20, 20, 10]} penumbra={1} angle={0.2} />
					<directionalLight color={"white"} position={[0, 5, 5]} />
					<group>
						<Float floatIntensity={2}>
							<TextEffect
								page={1}
								currentPage={Number.parseInt(page || "") || 1}
								position={[0, 0, -1.5]}
							>
								Portfolio
							</TextEffect>
							<TextEffect
								page={2}
								currentPage={Number.parseInt(page || "") || 1}
								position={[-1.5, 0, 0]}
								rotation={[0, Math.PI / 2, 0]}
							>
								Works
							</TextEffect>
							<TextEffect
								page={3}
								currentPage={Number.parseInt(page || "") || 1}
								position={[0, 0, 1.5]}
								rotation={[0, Math.PI, 0]}
							>
								About
							</TextEffect>
							<TextEffect
								page={4}
								currentPage={Number.parseInt(page || "") || 1}
								position={[1.5, 0, 0]}
								rotation={[0, (3 * Math.PI) / 2, 0]}
							>
								Contact
							</TextEffect>
							<MainObject page={Number.parseInt(page ?? "")} />
						</Float>
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
