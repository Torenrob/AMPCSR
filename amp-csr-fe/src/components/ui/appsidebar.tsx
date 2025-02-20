"use client";

import Image from "next/image";
import { SidebarContent, Sidebar, SidebarHeader, SidebarFooter } from "../shadcn/sidebar";
import { useEffect } from "react";
import Switch from "../shadcn/switch";

import { useDarkModeStore } from "@/services/darkmodeprovider";

export default function AppSideBar() {
	const { darkMode, setDarkMode, getSystemPreference } = useDarkModeStore((state) => state);

	useEffect(() => getSystemPreference(), [getSystemPreference]);

	const handleCheckChange = (checked: boolean) => {
		setDarkMode(checked);
	};

	if (darkMode === null) return null;

	return (
		<Sidebar className={`${darkMode ? "dark" : ""}`}>
			<SidebarHeader className="flex">
				<Image src="/AMPLogo.png" alt="AMP Logo" width={"900"} height={"900"} className="max-w-[80%] self-center" />
				<span className="text-[1vw] font-bold w-fit text-primary">Customer Service Portal</span>
			</SidebarHeader>
			<SidebarContent />
			<SidebarFooter>
				<Switch id="darkLightMode" className="self-center mb-4" checked={darkMode} onCheckedChange={handleCheckChange} />
			</SidebarFooter>
		</Sidebar>
	);
}
