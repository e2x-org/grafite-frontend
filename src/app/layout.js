import { Gowun_Dodum } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css";

const gowun_dodum = Gowun_Dodum({
	variable: "--font-gowun_dodum",
	subsets: ["latin"],
	weight: ['400']
});


export const metadata = {
	title: "grafite. | home",
	description: "sometimes all it takes is a shit ton of data and some coffee.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${gowun_dodum.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem >
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
