type GlassContainerProps = {
	children: React.ReactNode;
};

export default function GlassContainer({ children }: GlassContainerProps) {
	return (
		<div
			className={`backdrop-filter backdrop-blur-sm bg-opacity-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-clip-padding z-10 transition-all duration-300 font-sans border-2 border-[rgba(255,255,255,0.1)] rounded-2xl w-[90%] max-w-[600px] 
						${isTheme === "dark" ? "bg-gray-600" : "bg-gray-200"}
						${isModal === work.id ? "visible opacity-100" : "invisible opacity-0"}`}
		>
			{children}
		</div>
	);
}
