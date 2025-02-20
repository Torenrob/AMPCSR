import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import AppSideBar from "@/components/ui/appsidebar";
import UserProvider from "@/services/auth/repprovider";
import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<UserProvider>
			<SidebarProvider>
				<AppSideBar />
				<main>
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
		</UserProvider>
	);
}
