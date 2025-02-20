import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "AMP Service Portal",
	description: "AMP Memberships Customer Service Representative Portal",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${libreFranklin.className} antialiased`}>{children}</body>
		</html>
	);
}
