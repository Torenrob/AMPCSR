"use client";

import Switch from "@/components/shadcn/switch";
import LoginForm from "@/components/ui/loginform";
import RegisterForm from "@/components/ui/registerform";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const queryClient = new QueryClient();

export default function LandingPage() {
	const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
	const [showLoginRegister, setShowLoginRegister] = useState(true);

	const handleCheckChange = (checked: boolean) => {
		setDarkMode(checked);
	};

	return (
		<div className={`flex flex-col bg-background min-h-[100vh] min-w-[100vw] h-[100vh] w-[100vw] ${darkMode ? "dark" : ""}`}>
			<div className={`flex justify-between min-h-fit`}>
				<div className="flex max-w-[50%] pl-4 pt-4 items-baseline">
					<Image src="/AMPLogo.png" alt="AMP Logo" width={"900"} height={"900"} className="max-w-[15%] min-w-[15%]" />
					<span className="text-[1vw] font-bold w-fit text-primary">Customer Service Portal</span>
				</div>
				<Switch id="darkLightMode" className="self-center mr-8" checked={darkMode} onCheckedChange={handleCheckChange} />
			</div>
			<QueryClientProvider client={queryClient}>
				<div className="flex grow justify-center items-center">
					{showLoginRegister ? <LoginForm showRegister={() => setShowLoginRegister(false)} /> : <RegisterForm showLogin={() => setShowLoginRegister(true)} />}
				</div>
			</QueryClientProvider>
		</div>
	);
}
