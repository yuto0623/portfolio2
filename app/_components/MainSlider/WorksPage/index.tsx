import {
	Environment,
	Scroll,
	ScrollControls,
	Text,
	useScroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useQueryState } from "nuqs";
import { use, useEffect, useRef, useState } from "react";
import BgEffect from "../../ThreeCanvas/BgEffect";

export default function WorksPage({
	isTheme,
	stopScroll,
	setStopScroll,
}: {
	isTheme: string;
	stopScroll: boolean;
	setStopScroll: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const [page, setPage] = useQueryState("page");

	useEffect(() => {
		if (stopScroll) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	});

	// useEffect(() => {
	// 	if (page === "2") {
	// 		gsap.to(overlayRef.current, { opacity: 1, duration: 1 });
	// 	} else {
	// 		gsap.to(overlayRef.current, { opacity: 0, duration: 1 });
	// 	}
	// }, [page]);

	return (
		<>
			<div
				ref={overlayRef}
				className={`h-full w-[50%] left-1/2 top-1/2 -translate-y-1/2 absolute
              transition-all duration-500
              `}
			>
				<Canvas
					gl={{ antialias: true }}
					shadows
					camera={{ position: [0, 0, 5] }}
					className="[mask-image:linear-gradient(to_left,rgba(255,255,255,1)75%,rgba(255,255,255,0))]"
				>
					<Environment preset="studio" />
					<ambientLight intensity={0.1} />
					<spotLight position={[20, 20, 10]} penumbra={1} angle={0.2} />
					<directionalLight color={"white"} position={[0, 5, 5]} />
					<ScrollControls pages={3} damping={0.1} horizontal>
						<Scroll>
							<ScrollCheck
								stopScroll={stopScroll}
								setStopScroll={setStopScroll}
							/>
							<Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[0, 0, 0]}
								fontSize={1}
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

function ScrollCheck({
	stopScroll,
	setStopScroll,
}: {
	stopScroll: boolean;
	setStopScroll: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const data = useScroll();
	useFrame(() => {
		const range = data.range(0, 0.99);
		if (range !== 1 && range !== 0) {
			setStopScroll(true);
		} else {
			setStopScroll(false);
		}
	});
	return <mesh />;
}
