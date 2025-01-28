import { Suspense } from "react";
import AboutBlock from "./_components/AboutBlock";
import ContactBlock from "./_components/ContactBlock";
import GlassContainer from "./_components/GlassContainer";
import Header from "./_components/Header";
import MainSlider from "./_components/MainSlider";
import Scroll from "./_components/MainSlider/Scroll";
import ThemeButton from "./_components/ThemeButton";
import Background from "./_components/ThreeCanvas";

export default function Home() {
	return (
		<>
			<Header />
			<Background />
			<main>
				<MainSlider
					page1={<Scroll />}
					page3={<AboutBlock />}
					page4={<ContactBlock />}
				/>
			</main>
			<ThemeButton />
		</>
	);
}
