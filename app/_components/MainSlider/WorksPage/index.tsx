import { useIsTouchDevice } from "@/app/hooks/useIsTouchDevice";
import {
	Environment,
	Image,
	Scroll,
	ScrollControls,
	Text,
	useScroll,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

export default function WorksPage({
	isTheme,
	stopScroll,
	setStopScroll,
	setIsAllowSlideNext,
	setIsAllowSlidePrev,
}: {
	isTheme: string;
	stopScroll: boolean;
	setStopScroll: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAllowSlideNext: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAllowSlidePrev: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [page, setPage] = useQueryState("page");

	return (
		<>
			<div
				className={`h-[70%] w-full left-0 top-full -translate-y-full absolute
              transition-all duration-500 md:top-1/2 md:h-full md:-translate-y-1/2
              `}
			>
				<Canvas
					gl={{ antialias: true }}
					shadows
					camera={{ position: [0, 0, 5] }}
					className="md:[mask-image:linear-gradient(to_left,rgba(255,255,255,1)25%,rgba(255,255,255,0)50%)]"
				>
					<Environment preset="studio" />
					<ambientLight intensity={0.1} />
					<spotLight position={[20, 20, 10]} penumbra={1} angle={0.2} />
					<directionalLight color={"white"} position={[0, 5, 5]} />
					<ScrollControls pages={2} damping={0.1} horizontal>
						<Scroll>
							<ScrollCheck
								stopScroll={stopScroll}
								setStopScroll={setStopScroll}
								setIsAllowSlideNext={setIsAllowSlideNext}
								setIsAllowSlidePrev={setIsAllowSlidePrev}
							/>
							<Image url="test.jpg" position={[2, 0, 0]}>
								<planeGeometry args={[1, 1]} />
							</Image>
							{/* <Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[2, 0, 0]}
								fontSize={1}
								castShadow
							>
								test
							</Text>
							<Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[4, 0, 0]}
								fontSize={1}
								castShadow
							>
								test
							</Text>
							<Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[6, 0, 0]}
								fontSize={1}
								castShadow
							>
								test
							</Text>
							<Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[8, 0, 0]}
								fontSize={1}
								castShadow
							>
								test
							</Text>
							<Text
								color={isTheme === "dark" ? "#ffffff" : "#000000"}
								position={[10, 0, 0]}
								fontSize={1}
								castShadow
							>
								test
							</Text> */}
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
	setIsAllowSlideNext,
	setIsAllowSlidePrev,
}: {
	stopScroll: boolean;
	setStopScroll: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAllowSlideNext: React.Dispatch<React.SetStateAction<boolean>>;
	setIsAllowSlidePrev: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const data = useScroll();
	const prevOffset = useRef(0);
	const isTouchDevice = useIsTouchDevice();

	useFrame(() => {
		const currentOffset = data.offset;
		const delta = Math.abs(currentOffset - prevOffset.current);

		const edgeThreshold = 0.01;
		// console.log(currentOffset);

		if (isTouchDevice) {
			setIsAllowSlidePrev(true);
			setIsAllowSlideNext(true);
			setStopScroll(false);
			return;
		}

		if (currentOffset <= edgeThreshold) {
			setIsAllowSlidePrev(true); // 前へのスライドを無効化
			setIsAllowSlideNext(false);
		} else if (currentOffset >= 1 - edgeThreshold) {
			setIsAllowSlidePrev(false);
			setIsAllowSlideNext(true); // 次へのスライドを無効化
		} else {
			setIsAllowSlidePrev(true);
			setIsAllowSlideNext(true);
		}

		// スクロールが停止していて、かつ端にいる場合
		if (
			delta < 0.0001 &&
			(currentOffset <= edgeThreshold || currentOffset >= 1 - edgeThreshold)
		) {
			setStopScroll(false);
		} else {
			setStopScroll(true);
		}

		prevOffset.current = currentOffset;
	});

	return null;
}
