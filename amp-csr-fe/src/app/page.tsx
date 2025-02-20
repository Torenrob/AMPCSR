"use client";

import Switch from "@/components/shadcn/switch";
import LoginForm from "@/components/ui/loginform";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	user_name: z.string(),
	password: z.string(),
});

const registerSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	user_name: z.string(),
	password: z.string(),
});

function loginForm() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});
}

function registerForm() {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	});
}

export default function LandingPage() {
	const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
	const [showLogin, setShowLogin] = useState(true);

	function onRegisterSubmit(values: z.infer<typeof registerSchema>) {}

	const handleCheckChange = (checked: boolean) => {
		setDarkMode(checked);
	};

	return (
		<div className={`flex flex-col bg-background min-h-[100vh] min-w-[100vw] h-[100vh] w-[100vw] ${darkMode ? "dark" : ""}`}>
			<div className={`flex justify-between min-h-fit`}>
				<div className="flex max-w-[50%] pl-4 pt-4 items-baseline">
					<img src="/AMPLogo.png" alt="AMP Logo" className="max-w-[15%] min-w-[15%]" />
					<span className="text-[1vw] font-bold w-fit text-primary">Customer Service Portal</span>
				</div>
				<Switch id="darkLightMode" className="self-center mr-8" checked={darkMode} onCheckedChange={handleCheckChange} />
			</div>
			<div className="flex grow justify-center items-center">{showLogin ? <LoginForm showRegister={() => setShowLogin(false)} /> : <span></span>}</div>
		</div>
	);
}
