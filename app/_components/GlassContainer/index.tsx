import { useCustomTheme } from "@/app/hooks/useCustomTheme";

type GlassContainerProps = {
	children: React.ReactNode;
	invisible?: boolean;
	className?: string;
};

export default function GlassContainer({
	children,
	invisible,
	className,
}: GlassContainerProps) {
	const isTheme = useCustomTheme();
	return (
		<div
			className={`backdrop-filter backdrop-blur-sm bg-opacity-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-clip-padding z-10 transition-all duration-300 font-sans border-2 border-[rgba(255,255,255,0.1)] rounded-2xl w-[90%] max-w-[600px] 
						${isTheme === "dark" ? "bg-[#292929]" : "bg-gray-200"} 
						${invisible ? "invisible opacity-0" : "visible opacity-100"} 
            ${className}`}
		>
			{children}
		</div>
	);
}
