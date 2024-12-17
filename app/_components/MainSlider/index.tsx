"use client";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, type SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import { Mousewheel, Pagination } from "swiper/modules";
import CustomPagination from "./CustomPagination";
import Scroll from "./Scroll";

export default function MainSlider() {
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({
			history: "push",
			scroll: false,
			shallow: false,
			clearOnDefault: false,
		}),
	);

	const [work, setWork] = useQueryState(
		"work",
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

	const workHandleChange = (swiper: SwiperType) => {
		// console.log(swiper.activeIndex);
		setWork(swiper.activeIndex + 1);
	};

	const swiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: (swiper) => pageHandleChange(swiper),
		onSwiper: (swiper) => console.log("a"),
		initialSlide: page - 1,
		mousewheel: true,
		modules: [Pagination, Mousewheel],
		pagination: true,
		className: "h-[100dvh] w-[100dvw]",
		speed: 1000,
	};

	const worksSwiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: (swiper) => workHandleChange(swiper),
		initialSlide: work - 1,
		modules: [Mousewheel],
		mousewheel: {
			forceToAxis: true,
		},
		className: "h-[100dvh] w-[100dvw]",
	};

	return (
		<>
			<Swiper {...swiperProps}>
				<SwiperSlide className="relative">
					<Scroll page={page} />
				</SwiperSlide>
				<SwiperSlide className="relative">
					<p>2Page</p>
					<div
						className={`w-1/2 h-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute backdrop-filter backdrop-blur-sm
												transition-all duration-500 rounded-3xl border border-[#e4e4e48f]
							 ${isTheme === "dark" ? "bg-[#ffffff27]" : "bg-[#00000027]"}`}
					/>
					{/* <Swiper {...worksSwiperProps}>
						<SwiperSlide>
							<p>2Page(1)</p>
						</SwiperSlide>
						<SwiperSlide>
							<p>2Page(2)</p>
						</SwiperSlide>
						<SwiperSlide>
							<p>2Page(3)</p>
						</SwiperSlide>
					</Swiper> */}
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
