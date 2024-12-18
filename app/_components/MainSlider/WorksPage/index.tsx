import { Environment, Scroll, ScrollControls, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useQueryState } from "nuqs";
import { use, useEffect, useRef } from "react";
import BgEffect from "../../ThreeCanvas/BgEffect";

export default function WorksPage({ isTheme }: { isTheme: string }) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const [page, setPage] = useQueryState("page");

	// useEffect(() => {
	// 	if (page === "2") {
	// 		gsap.to(overlayRef.current, { opacity: 1, duration: 1 });
	// 	} else {
	// 		gsap.to(overlayRef.current, { opacity: 0, duration: 1 });
	// 	}
	// }, [page]);

	return (
		<>
			<p>2Page</p>
			<div
				ref={overlayRef}
				className={`h-[500px] w-[35%] left-1/2 top-1/2 -translate-y-1/2 absolute backdrop-filter backdrop-blur-sm
              transition-all duration-500 rounded-3xl border border-[#e4e4e48f]
              ${isTheme === "dark" ? "bg-[#ffffff27]" : "bg-[#00000027]"}`}
			>
				Click me
				<Canvas
					gl={{ antialias: true }}
					shadows
					camera={{ position: [0, 0, 5] }}
				>
					<Environment preset="studio" />
					<ambientLight intensity={0.1} />
					<spotLight position={[20, 20, 10]} penumbra={1} angle={0.2} />
					<directionalLight color={"white"} position={[0, 5, 5]} />
					<ScrollControls pages={3} damping={0.1} horizontal>
						<Scroll>
							<Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[0, 0, 0]}
								fontSize={2}
								castShadow
							>
								test
							</Text>
						</Scroll>
					</ScrollControls>
				</Canvas>
			</div>
		</>
	);
}
