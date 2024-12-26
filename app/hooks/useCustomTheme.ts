import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const useCustomTheme = () => {
	const { theme, resolvedTheme } = useTheme();
	const [isTheme, setIsTheme] = useState<string | undefined>("");

	useEffect(() => {
		let currentTheme: string | undefined;
		if (resolvedTheme === "system") {
			currentTheme = theme;
		} else {
			currentTheme = resolvedTheme;
		}
		setIsTheme(currentTheme);
	}, [theme, resolvedTheme]);

	return isTheme;
};
