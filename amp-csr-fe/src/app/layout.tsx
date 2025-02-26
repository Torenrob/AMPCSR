import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import QueryProvider from "@/services/queryprovider";
import DarkModeProvider from "@/services/darkmodeprovider";
import UserProvider from "@/services/auth/repprovider";
import AppSideBar from "./appsidebar";

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
					<UserProvider>
						<SidebarProvider>
							<AppSideBar />
							<DarkModeProvider>
								<SidebarTrigger className="absolute text-primary mt-2" />
								<main className="grow flex">{children}</main>
							</DarkModeProvider>
						</SidebarProvider>
					</UserProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
