import { type WorksList, client } from "@/app/_libs/microCMS";
import { getWindowSize } from "@/app/hooks/GetWindowSize";
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
import parse from "html-react-parser";
import { default as NextImage } from "next/image";
import Link from "next/link";
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
	const [isModal, setIsModal] = useState<string | null>(null);
	const { width, height } = getWindowSize();

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

	const ToggleModal = (id: string) => {
		if (isModal === id) {
			setIsModal(null);
		} else {
			setIsModal(id);
		}
	};

	return (
		<>
			{works?.contents.map((work) => (
				<div
					key={work.id}
					className={`backdrop-filter backdrop-blur-sm bg-opacity-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-clip-padding z-10 transition-all duration-300 rounded-2xl font-sans 
						${isTheme === "dark" ? "bg-gray-400" : "bg-gray-400"}
						${isModal === work.id ? "visible opacity-100" : "invisible opacity-0"}`}
				>
					<NextImage
						src={work.thumbnail.url}
						alt={work.title}
						width={work.thumbnail.width}
						height={work.thumbnail.height}
					/>
					<div
						className={`flex justify-between items-center ${isTheme === "dark" ? "text-gray-200" : "text-gray-800"}`}
					>
						<Link href={work.url} target="_blank">
							{work.url}
						</Link>
						<p>
							{work.skill.map((text, index) => {
								return `${text}${index !== work.skill.length - 1 ? " / " : ""}`;
							})}
						</p>
					</div>
					<h3 className="text-lg mb-3">{work.title}</h3>
					<p className="mb-3">{parse(work.description)}</p>
					<div className="flex justify-center">
						<button
							type="button"
							onClick={() => ToggleModal("")}
							className="px-8 py-2 backdrop-filter backdrop-blur-sm bg-opacity-10 bg-clip-padding rounded-xl hover:bg-white hover:bg-opacity-10"
						>
							閉じる
						</button>
					</div>
				</div>
			))}
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
											position={[
												2 * (2 * (width < 768 ? index : index + 1)),
												-1,
												0,
											]}
											fontSize={0.15}
											castShadow
											key={work.id + Math.random()}
											onClick={() => ToggleModal(work.id)}
										>
											{truncateTitle(work.title)}
										</Text>
										<Image
											url={work.thumbnail.url}
											position={[
												2 * (2 * (width < 768 ? index : index + 1)),
												0.2,
												0,
											]}
											key={work.id + Math.random()}
											onClick={() => ToggleModal(work.id)}
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
