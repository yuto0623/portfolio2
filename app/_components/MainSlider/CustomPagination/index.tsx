import { useSwiper } from "swiper/react";

const pageList = ["Top", "Works", "About", "Contact"];

export default function CustomPagination({ page }: { page: number }) {
	const swiper = useSwiper();
	return (
		<div className="fixed bottom-14 right-1 z-20 flex flex-col pr-3 justify-center md:h-[60dvh] md:right-4 md:top-1/2 md:bottom-0 md:-translate-y-1/2">
			<ul className="text-right flex flex-col gap-4">
				{pageList.map((item, index) => (
					<li
						onClick={() => swiper.slideTo(index)}
						onKeyDown={() => swiper.slideTo(index)}
						key={item}
						className={`flex items-start relative transition-all duration-300 cursor-pointer [writing-mode:vertical-rl] md:[writing-mode:horizontal-tb] md:block ${
							index + 1 === page ? "text-2xl md:text-4xl" : ""
						}`}
					>
						{item.split("").map((char, charIndex) => (
							<span
								key={char + charIndex.toString()}
								className={`${charIndex === 0 && index + 1 === page ? "text-accent" : ""}`}
							>
								{char}
							</span>
						))}
					</li>
				))}
			</ul>
		</div>
	);
}
