"use client";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, type SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";

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

	// console.log(page);

	const handleChange = (swiper: SwiperType) => {
		// console.log(swiper.activeIndex);
		setPage(swiper.activeIndex + 1);
	};

	const swiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: (swiper) => handleChange(swiper),
		onSwiper: (swiper) => console.log("a"),
		className: "h-[100dvh] w-[100dvw]",
		initialSlide: page - 1,
	};

	return (
		<Swiper {...swiperProps}>
			<SwiperSlide>
				<p>1Page</p>
			</SwiperSlide>
			<SwiperSlide>
				<p>2Page</p>
			</SwiperSlide>
			<SwiperSlide>
				<p>3Page</p>
			</SwiperSlide>
			<SwiperSlide>
				<p>4Page</p>
			</SwiperSlide>
		</Swiper>
	);
}
