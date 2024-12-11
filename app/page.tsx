import { Suspense } from "react";
import Background from "./_components/ThreeCanvas";

export default function Home() {
	return (
		<>
			<main>
				<Suspense fallback={null}>
					<Background />
				</Suspense>
			</main>
		</>
	);
}
