"use client";

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setTokenHeader } from "@/lib/utils";
import { createContext } from "react";

export type CSREP = {
	employeeId: string;
	first_name: string;
	last_name: string;
	user_name: string;
};

export type CSREP_CONTEXT = {
	rep: CSREP | null;
	setRep: Dispatch<SetStateAction<CSREP | null>>;
};

export const CSREP_CONTEXT = createContext<CSREP_CONTEXT>({} as CSREP_CONTEXT);

export default function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [rep, setRep] = useState<CSREP | null>(null);

	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("repToken");
		const repInfo = Cookies.get("repInfo");

		if (!token || !repInfo) return router.push("/");

		setTokenHeader(token);
		setRep(JSON.parse(repInfo));
		return router.push("/recent");
	}, [setRep, router]);

	return <CSREP_CONTEXT.Provider value={{ rep, setRep }}>{children}</CSREP_CONTEXT.Provider>;
}
