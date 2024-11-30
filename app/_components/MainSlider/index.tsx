"use client";
import Image from "next/image";
import { Swiper, type SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MainSlider() {
	const swiperProps: SwiperProps = {
		direction: "vertical",
		slidesPerView: 1,
		onSlideChange: () => console.log("slide change"),
		onSwiper: (swiper) => console.log(swiper),
		className: "h-[100dvh] w-[100dvw]",
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
