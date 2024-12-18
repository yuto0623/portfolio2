"use client";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, type SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Mousewheel, Pagination } from "swiper/modules";
import CustomPagination from "./CustomPagination";
import Scroll from "./Scroll";
import WorksPage from "./WorksPage";

export default function MainSlider() {
	const [stopScroll, setStopScroll] = useState(false);

	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({
			history: "push",
			scroll: false,
			shallow: false,
			clearOnDefault: false,
		}),
	);

	const [isTheme, setIsTheme] = useState<string | undefined>("");
	const { theme, resolvedTheme } = useTheme();
	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	// console.log(page);

	const pageHandleChange = (swiper: SwiperType) => {
		// console.log(swiper.activeIndex);
		setPage(swiper.activeIndex + 1);
	};

	const swiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: (swiper) => pageHandleChange(swiper),
		onSwiper: (swiper) => console.log(swiper),
		initialSlide: page - 1,
		modules: [Pagination, Mousewheel],
		pagination: true,
		className: "h-[100dvh] w-[100dvw]",
		speed: 1000,
		mousewheel: true,
	};

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
