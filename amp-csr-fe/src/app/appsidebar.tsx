"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useDarkModeStore } from "@/services/darkmodeprovider";
import "./appsidebar.css";
import CarIcon from "@/components/icons/caricon";
import CustomerIcon from "@/components/icons/customericon";
import PurchaseIcon from "@/components/icons/purchaseicon";
import { Separator } from "@/components/shadcn/separator";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";
import RecentIcon from "@/components/icons/recenticon";
import Switch from "@/components/shadcn/switch";
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, Sidebar } from "@/components/shadcn/sidebar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LogOutModal from "./logoutmodal";

export default function AppSideBar() {
	const { darkMode, setDarkMode, getSystemPreference } = useDarkModeStore((state) => state);
	const router = useRouter();
	const { rep, setRep } = useContext(CSREP_CONTEXT);
	const [currentRoute, setCurrentRoute] = useState<string>(rep ? "/recent" : "/");

	useEffect(() => {
		setCurrentRoute(rep ? "/recent" : "/");
	}, [rep, setCurrentRoute]);

	const setRoute = (route: string) => {
		setCurrentRoute(route);
		router.push(route);
	};

	useEffect(() => getSystemPreference(), [getSystemPreference]);

	const handleCheckChange = (checked: boolean) => {
		setDarkMode(checked);
	};

	const logOut = () => {
		Cookies.remove("repToken");
		Cookies.remove("repInfo");
		setRep(null);
		setRoute("/");
	};

	const sidebarMenuItemStyle = "text-primary text-md mb-3";

	if (darkMode === null) return null;

	return (
		<Sidebar id="sidebar" collapsible="icon" className={`${darkMode ? "dark" : ""} bg-accent`}>
			<SidebarHeader className="flex">
				<Image priority src="/AMPLogo.png" alt="AMP Logo" width={"900"} height={"900"} className="max-w-[80%] self-center" />
				<span className="text-[110%] font-bold self-center text-primary text-nowrap" id="sidebarTitleLine">
					Customer Service Portal
				</span>
			</SidebarHeader>
			<Separator className="w-[90%] self-center bg-sidebar-border" />
			<span id="repLoginText" className={`mt-2 self-center ${rep ? "" : "text-sidebar"}`}>
				Logged In: {`${rep?.first_name} ${rep?.last_name}`}
			</span>
			<SidebarContent className="font-semibold">
				<SidebarGroup></SidebarGroup>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton className={`${sidebarMenuItemStyle} ${currentRoute === "/recent" ? "text-sidebar-ring" : ""}`} onClick={() => setRoute("/recent")}>
								<RecentIcon />
								<span>Recently Viewed</span>
							</SidebarMenuButton>
							<SidebarMenuButton className={`${sidebarMenuItemStyle} ${currentRoute === "/users" ? "text-sidebar-ring" : ""}`} onClick={() => setRoute("/users")}>
								<CustomerIcon />
								<span>Users</span>
							</SidebarMenuButton>
							<SidebarMenuButton className={`${sidebarMenuItemStyle} ${currentRoute === "/vehicles" ? "text-sidebar-ring" : ""}`} onClick={() => setRoute("/vehicles")}>
								<CarIcon />
								<span>Vehicles</span>
							</SidebarMenuButton>
							<SidebarMenuButton className={`${sidebarMenuItemStyle} ${currentRoute === "/purchase" ? "text-sidebar-ring" : ""}`} onClick={() => setRoute("/purchase")}>
								<PurchaseIcon />
								<span>Purchase History</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="z-10 flex flex-col">
				{rep ? <LogOutModal logout={logOut} /> : ""}
				<Switch id="darkLightMode" className="self-center mb-4" checked={darkMode} onCheckedChange={handleCheckChange} />
			</SidebarFooter>
			{!rep && <div className="absolute h-full w-full bg-black/50 z-0"></div>}
		</Sidebar>
	);
}
