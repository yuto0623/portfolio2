import { Suspense } from "react";
import AboutBlock from "./_components/AboutBlock";
import ContactBlock from "./_components/ContactBlock";
import GlassContainer from "./_components/GlassContainer";
import MainSlider from "./_components/MainSlider";
import Scroll from "./_components/MainSlider/Scroll";
import Background from "./_components/ThreeCanvas";

export default function Home() {
	return (
		<>
			<Suspense fallback={null}>
				<Background />
			</Suspense>
			<main>
				<Suspense fallback={null}>
					<MainSlider
						page1={<Scroll />}
						page3={<AboutBlock />}
						page4={<ContactBlock />}
					/>
				</Suspense>
			</main>
		</>
	);
}
