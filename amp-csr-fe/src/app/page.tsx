"use client";

import LoginForm from "@/app/loginform";
import RegisterForm from "@/app/registerform";
import { useState } from "react";

export default function LandingPage() {
	const [showLoginRegister, setShowLoginRegister] = useState(true);

	return (
		<div className="flex h-screen w-screen bg-black/50 absolute left-0 justify-center items-center">
			{showLoginRegister ? <LoginForm showRegister={() => setShowLoginRegister(false)} /> : <RegisterForm showLogin={() => setShowLoginRegister(true)} />}
		</div>
	);
}
