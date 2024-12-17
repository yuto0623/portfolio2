import { useSwiper } from "swiper/react";

const pageList = ["Top", "Works", "About", "Contact"];

export default function CustomPagination({ page }: { page: number }) {
	const swiper = useSwiper();
	return (
		<div className="fixed bottom-2 right-10 z-20 flex flex-col pr-3 justify-center md:h-[60dvh] md:right-4 md:top-1/2 md:bottom-0 md:-translate-y-1/2">
			{/* <span className="h-full w-[1px] bg-black absolute right-0 top-0 rounded-full" /> */}
			<ul className="text-right flex flex-row gap-4 md:flex-col">
				{pageList.map((item, index) => (
					<li
						onClick={() => swiper.slideTo(index)}
						onKeyDown={() => swiper.slideTo(index)}
						key={item}
						className={`flex items-end relative transition-all duration-300 cursor-pointer md:block ${index + 1 === page ? "text-4xl underline" : ""}`}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
