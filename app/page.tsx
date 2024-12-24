import { Suspense } from "react";
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
					<MainSlider page1={<Scroll />} />
				</Suspense>
			</main>
		</>
	);
}
