import { Suspense } from "react";
import Background from "./_components/ThreeCanvas";
import MainSlider from "./_components/MainSlider";

export default function Home() {
	return (
		<>
			<Background />
			<main>
				<MainSlider />
			</main>
		</>
	);
}
