import { type WorksList, client } from "@/app/_libs/microCMS";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";
import { useIsTouchDevice } from "@/app/hooks/useIsTouchDevice";
import { useWindowSize } from "@/app/hooks/useWindowSize";
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
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../../ContactBlock/Button";
import GlassContainer from "../../GlassContainer";

export default function WorksPage({
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
	const [works, setWorks] = useState<WorksList>();
	const [isModal, setIsModal] = useState<string | null>(null);
	const isTheme = useCustomTheme();
	const { width } = useWindowSize();

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch("/api/works").then((res) => res.json());
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

	const calculatePages = () => {
		if (!works) return 0;
		if (width < 280) return works.contents.length * 1.3;
		if (width < 305) return works.contents.length * 1.2;
		if (width < 330) return works.contents.length * 1.1;
		if (width < 380) return works.contents.length * 1;
		if (width < 430) return works.contents.length * 0.9;
		if (width < 490) return works.contents.length * 0.8;
		if (width < 530) return works.contents.length * 0.7;
		if (width < 570) return works.contents.length * 0.66;
		if (width < 630) return works.contents.length * 0.62;
		if (width < 670) return works.contents.length * 0.57;
		if (width < 740) return works.contents.length * 0.54;
		if (width < 768) return works.contents.length * 0.5;
		if (width < 860) return works.contents.length * 0.67;
		if (width < 940) return works.contents.length * 0.6;
		if (width < 1050) return works.contents.length * 0.56;
		if (width < 1130) return works.contents.length * 0.52;
		if (width < 1250) return works.contents.length * 0.48;
		if (width < 1350) return works.contents.length * 0.44;
		if (width < 1450) return works.contents.length * 0.42;
		if (width < 1600) return works.contents.length * 0.4;
		if (width < 1700) return works.contents.length * 0.38;
		return works.contents.length * 0.33;
	};

	return (
		<>
			{works?.contents.map((work) => (
				<GlassContainer
					key={work.id}
					invisible={isModal !== work.id}
					className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] max-w-[600px]"
				>
					{work.thumbnail ? (
						<NextImage
							src={work.thumbnail.url}
							alt={work.title}
							width={work.thumbnail.width}
							height={work.thumbnail.height}
						/>
					) : (
						<div className="w-full h-[200px] bg-gray-50">
							<p className="w-full h-full flex justify-center items-center text-black">
								No Image
							</p>
						</div>
					)}
					<div
						className={`flex justify-between items-center mb-4 ${isTheme === "dark" ? "text-gray-200" : "text-gray-800"}`}
					>
						{work.url ? (
							<Link href={work.url} target="_blank">
								{work.url}
							</Link>
						) : (
							<p>Closed</p>
						)}
						<p>
							{work.skill.map((text, index) => {
								return `${text}${index !== work.skill.length - 1 ? " / " : ""}`;
							})}
						</p>
					</div>
					<h3 className="text-lg mb-3">{work.title}</h3>
					<div className="mb-3">{parse(work.description)}</div>
					<div className="flex justify-center">
						<Button type="button" onClick={() => ToggleModal("")}>
							閉じる
						</Button>
					</div>
				</GlassContainer>
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
					<ScrollControls pages={calculatePages()} damping={0.1} horizontal>
						<Scroll>
							<ScrollCheck
								stopScroll={stopScroll}
								setStopScroll={setStopScroll}
								setIsAllowSlideNext={setIsAllowSlideNext}
								setIsAllowSlidePrev={setIsAllowSlidePrev}
							/>
							{works?.contents.map((work, index) => {
								const aspectRatio = work.thumbnail
									? work.thumbnail.width / work.thumbnail.height
									: 1;
								const baseSize = 2; //基準サイズ
								const width = baseSize * aspectRatio;
								const height = baseSize;
								const spacing = 4; // 画像間の固定間隔
								const xPosition = spacing * (width < 768 ? index : index + 1);

								// タイトルを省略
								const truncateTitle = (title: string, maxLength = 20) => {
									return title.length > maxLength
										? `${title.slice(0, maxLength)}...`
										: title;
								};

								return (
									<Fragment key={work.id}>
										<Text
											color={isTheme === "dark" ? "#ffffff" : "#000000"}
											position={[
												2 * (2 * (width < 768 ? index : index + 1)),
												-1,
												0,
											]}
											fontSize={0.15}
											castShadow
											onClick={() => ToggleModal(work.id)}
										>
											{truncateTitle(work.title)}
										</Text>
										{work.thumbnail ? (
											<Image
												url={work.thumbnail.url}
												position={[xPosition, 0.2, 0]}
												onClick={() => ToggleModal(work.id)}
											>
												<planeGeometry args={[width, height]} />
											</Image>
										) : (
											// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
											<mesh
												position={[xPosition, 0.2, 0]}
												onClick={() => ToggleModal(work.id)}
											>
												<planeGeometry args={[width, height]} />
												<meshBasicMaterial
													color={isTheme === "dark" ? "#ffffff" : "#000000"}
												/>
												<Text
													position={[0, 0, 0]}
													fontSize={0.2}
													color={isTheme === "dark" ? "#000000" : "#ffffff"}
													anchorX="center"
													anchorY="middle"
												>
													No Image
												</Text>
											</mesh>
										)}
									</Fragment>
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
