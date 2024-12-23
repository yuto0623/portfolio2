import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "./_components/Header";
import ThemeButton from "./_components/ThemeButton";

const MontserratSubrayadaRegular = localFont({
	src: "./_fonts/MontserratSubrayadaRegular.woff2",
	variable: "--font-montserrat-subrayada",
	weight: "400",
});

// const squadaOne = localFont({
// 	src: "./_fonts/SquadaOne.woff2",
// 	variable: "--font-squada-one",
// 	weight: "400",
// });
// const geistMono = localFont({
// 	src: "./_fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

export const metadata: Metadata = {
	title: "Yuto Shintani's portfolio",
	description: "Yuto Shintani's portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className={`${MontserratSubrayadaRegular.variable} antialiased`}>
				<ThemeProvider>
					<NuqsAdapter>
						<Header />
						{children}
						<ThemeButton />
					</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
