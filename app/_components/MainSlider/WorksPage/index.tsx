import { type WorksList, client } from "@/app/_libs/microCMS";
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
import { useEffect, useRef, useState } from "react";

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
	const [works, setWorks] = useState<WorksList>();

	useEffect(() => {
		const fetchData = async () => {
			const data = await client.getList({ endpoint: "works" });
			setWorks(data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log(works);
	}, [works]);

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
					className="md:[mask-image:linear-gradient(to_left,rgba(255,255,255,1)50%,rgba(255,255,255,0)70%)]"
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
							{works?.contents.map((work, index) => {
								const aspectRatio =
									work.thumbnail.width / work.thumbnail.height;
								const baseSize = 2; //基準サイズ
								const width = baseSize * aspectRatio;
								const height = baseSize;

								// タイトルを省略
								const truncateTitle = (title: string, maxLength = 20) => {
									return title.length > maxLength
										? `${title.slice(0, maxLength)}...`
										: title;
								};

								return (
									<>
										<Text
											color={isTheme === "dark" ? "#ffffff" : "#000000"}
											position={[2 * (2 * (index + 1)), -1, 0]}
											fontSize={0.15}
											castShadow
											key={work.id + Math.random()}
										>
											{truncateTitle(work.title)}
										</Text>
										<Image
											url={work.thumbnail.url}
											position={[2 * (2 * (index + 1)), 0.2, 0]}
											key={work.id + Math.random()}
										>
											<planeGeometry args={[width, height]} />
										</Image>
									</>
								);
							})}
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
