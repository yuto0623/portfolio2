import { useSwiper } from "swiper/react";

const pageList = ["Top", "Works", "About", "Contact"];

export default function CustomPagination({ page }: { page: number }) {
	const swiper = useSwiper();
	return (
		<div className="fixed top-1/2 -translate-y-1/2 right-4 h-[60dvh] z-20 flex flex-col pr-3 justify-center">
			{/* <span className="h-full w-[1px] bg-black absolute right-0 top-0 rounded-full" /> */}
			<ul className="text-right flex flex-col gap-4">
				{pageList.map((item, index) => (
					<li
						onClick={() => swiper.slideTo(index)}
						onKeyDown={() => swiper.slideTo(index)}
						key={item}
						className={`relative transition-all duration-300 cursor-pointer ${index + 1 === page ? "text-4xl underline" : ""}`}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
