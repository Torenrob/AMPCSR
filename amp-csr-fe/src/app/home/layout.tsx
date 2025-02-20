import UserProvider from "@/services/auth/repprovider";
import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return <UserProvider>{children}</UserProvider>;
}
