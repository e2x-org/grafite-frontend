import { Reddit_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"

import Parser from 'html-react-parser';

import "./globals.css";

const reddit_sans = Reddit_Sans({
	variable: "--font-roboto",
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
			<body className={`${reddit_sans.variable} antialiased`}>
				{Parser(`<script type="text/x-mathjax-config">
						MathJax = {
							tex: {
							inlineMath: [['$', '$'], ["\(", "\)"]],
							processEscapes: true,
							}
						}
						</script>
						<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
						`)}
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem >
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
