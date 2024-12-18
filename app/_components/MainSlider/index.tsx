"use client";
import Image from "next/image";
import type SwiperCore from "swiper";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, type SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { Mousewheel, Pagination } from "swiper/modules";
import CustomPagination from "./CustomPagination";
import Scroll from "./Scroll";
import WorksPage from "./WorksPage";

export default function MainSlider() {
	const [stopScroll, setStopScroll] = useState(false);
	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const [isAllowSlideNext, setIsAllowSlideNext] = useState(false);
	const [isAllowSlidePrev, setIsAllowSlidePrev] = useState(false);
	const swiperRef = useRef<SwiperCore>();
	const { theme, resolvedTheme } = useTheme();
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({
			history: "push",
			scroll: false,
			shallow: false,
			clearOnDefault: false,
		}),
	);

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	const pageHandleChange = (swiper: SwiperType) => {
		setPage(swiper.activeIndex + 1);
	};

	const onInit = (Swiper: SwiperCore): void => {
		swiperRef.current = Swiper;
	};

	const swiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: (swiper) => pageHandleChange(swiper),
		// onSwiper: (swiper) => console.log(swiper),
		initialSlide: page - 1,
		modules: [Pagination, Mousewheel],
		pagination: true,
		className: "h-[100dvh] w-[100dvw]",
		speed: 1000,
		mousewheel: { forceToAxis: true },
		onInit: onInit,
	};

	useEffect(() => {
		if (stopScroll) {
			swiperRef.current?.mousewheel.disable();
			console.log("スクロール無効");
		} else {
			swiperRef.current?.mousewheel.enable();
			console.log("スクロール有効");
		}
		if (swiperRef.current) {
			if (isAllowSlideNext) {
				swiperRef.current.allowSlideNext = true;
				console.log("nextスクロール有効");
			} else if (!isAllowSlideNext) {
				swiperRef.current.allowSlideNext = false;
				console.log("nextスクロール無効");
			}
			if (isAllowSlidePrev) {
				swiperRef.current.allowSlidePrev = true;
				console.log("prevスクロール有効");
			} else if (!isAllowSlidePrev) {
				swiperRef.current.allowSlidePrev = false;
				console.log("prevスクロール無効");
			}
		}
		if (page !== 2) {
			console.log("worksページ以外");
			if (swiperRef.current) {
				swiperRef.current.allowSlideNext = true;
				console.log("nextスクロール有効");
				swiperRef.current.allowSlidePrev = true;
				console.log("prevスクロール有効");
			}
		}
	});

	useEffect(() => {
		console.log(isAllowSlideNext, isAllowSlidePrev);
	}, [isAllowSlideNext, isAllowSlidePrev]);

	return (
		<>
			<Swiper {...swiperProps}>
				<SwiperSlide className="relative">
					<Scroll page={page} />
				</SwiperSlide>
				<SwiperSlide className="relative">
					<WorksPage
						isTheme={isTheme || ""}
						stopScroll={stopScroll}
						setStopScroll={setStopScroll}
						setIsAllowSlideNext={setIsAllowSlideNext}
						setIsAllowSlidePrev={setIsAllowSlidePrev}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<p>3Page</p>
				</SwiperSlide>
				<SwiperSlide>
					<p>4Page</p>
				</SwiperSlide>
				<CustomPagination page={page} />
			</Swiper>
		</>
	);
}
