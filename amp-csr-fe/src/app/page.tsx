"use client";

import LoginForm from "@/components/ui/loginform";
import RegisterForm from "@/components/ui/registerform";
import { useState } from "react";

export default function LandingPage() {
	const [showLoginRegister, setShowLoginRegister] = useState(true);

	return (
		<div className="flex w-full h-full justify-center items-center">
			{showLoginRegister ? <LoginForm showRegister={() => setShowLoginRegister(false)} /> : <RegisterForm showLogin={() => setShowLoginRegister(true)} />}
		</div>
	);
}
