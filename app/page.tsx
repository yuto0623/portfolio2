import { Suspense } from "react";
import AboutBlock from "./_components/AboutBlock";
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
						page3={
							<GlassContainer className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
								<AboutBlock />
							</GlassContainer>
						}
					/>
				</Suspense>
			</main>
		</>
	);
}
