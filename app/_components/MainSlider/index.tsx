"use client";
import type SwiperCore from "swiper";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, type SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryState } from "nuqs";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Mousewheel, Pagination } from "swiper/modules";
import CustomPagination from "./CustomPagination";
import Scroll from "./Scroll";
import WorksPage from "./WorksPage";
import { useCustomTheme } from "@/app/hooks/useCustomTheme";

type MainSliderProps = {
	page1: React.ReactNode;
	page2?: React.ReactNode;
	page3?: React.ReactNode;
	page4?: React.ReactNode;
};

export default function MainSlider({
	page1,
	page2,
	page3,
	page4,
}: MainSliderProps) {
	const [stopScroll, setStopScroll] = useState(false);
	const [isAllowSlideNext, setIsAllowSlideNext] = useState(false);
	const [isAllowSlidePrev, setIsAllowSlidePrev] = useState(false);
	const isTheme = useCustomTheme();
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

	const pageHandleChange = (swiper: SwiperType) => {
		setPage(swiper.activeIndex + 1);
		if (swiper.activeIndex !== 1) {
			setStopScroll(false);
		}
	};

	const onInit = (Swiper: SwiperCore): void => {
		swiperRef.current = Swiper;
	};

	const swiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: (swiper) => pageHandleChange(swiper),
		initialSlide: page - 1,
		modules: [Pagination, Mousewheel],
		pagination: true,
		className: "h-[100dvh] w-[100dvw]",
		speed: 1000,
		mousewheel: { forceToAxis: true },
		onInit: onInit,
	};

	useEffect(() => {
		const swiper = swiperRef.current;
		if (swiper) {
			if (stopScroll) {
				swiper.mousewheel.disable();
			} else {
				swiper.mousewheel.enable();
			}

			if (page !== 2) {
				swiper.allowSlideNext = true;
				swiper.allowSlidePrev = true;
			} else {
				swiper.allowSlideNext = isAllowSlideNext;
				swiper.allowSlidePrev = isAllowSlidePrev;
			}
		}
	}, [stopScroll, isAllowSlideNext, isAllowSlidePrev, page]);

	return (
		<>
			<Swiper {...swiperProps}>
				<SwiperSlide className="relative">{page1}</SwiperSlide>
				<SwiperSlide className="relative">
					<WorksPage
						stopScroll={stopScroll}
						setStopScroll={setStopScroll}
						setIsAllowSlideNext={setIsAllowSlideNext}
						setIsAllowSlidePrev={setIsAllowSlidePrev}
					/>
				</SwiperSlide>
				<SwiperSlide>{page3}</SwiperSlide>
				<SwiperSlide>
					<p>4Page</p>
				</SwiperSlide>
				<CustomPagination page={page} />
			</Swiper>
		</>
	);
}
