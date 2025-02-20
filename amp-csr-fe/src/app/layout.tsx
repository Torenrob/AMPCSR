import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import AppSideBar from "@/components/ui/appsidebar";
import QueryProvider from "@/services/queryprovider";
import DarkModeProvider from "@/services/darkmodeprovider";

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
			<body className={`${libreFranklin.className} antialiased `}>
				<QueryProvider>
					<SidebarProvider>
						<AppSideBar />
						<DarkModeProvider>
							<SidebarTrigger className="absolute text-sidebar-ring" />
							<main className="grow">{children}</main>
						</DarkModeProvider>
					</SidebarProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
