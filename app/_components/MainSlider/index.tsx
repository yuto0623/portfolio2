"use client";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, type SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import { Mousewheel, Pagination } from "swiper/modules";
import CustomPagination from "./CustomPagination";

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
					<div
						className={`absolute left-5 bottom-1/2 translate-y-1/2 [writing-mode:vertical-rl] text-xl
							transition-all 
							 ${page === 1 ? "opacity-100 duration-[2000ms]" : "opacity-0 -translate-x-full duration-300"}`}
					>
						Scroll
						<span className="absolute top-0 left-0 h-[150%] w-0.5 bg-black" />
						<span className="absolute -bottom-[25px] left-0 h-5 w-5 animate-bounce">
							<HiOutlineArrowLongDown />
						</span>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<p>2Page</p>
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
