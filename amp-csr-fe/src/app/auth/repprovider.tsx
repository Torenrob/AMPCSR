import { useMutation, UseMutationResult } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { loginCredentials, loginCSREP, registerCredentials, registerCSREP, validCSREP } from "../api/auth";
import { CSREP, CSREP_context, CSREP_CONTEXT } from "./repcontext";
import Cookies from "js-cookie";
import axios from "axios";

export default function UserProvider({ children }: { children: ReactNode }) {
	const [rep, setRep] = useState<CSREP | null>(null);

	const repLoginMutation: UseMutationResult<validCSREP, Error, loginCredentials, unknown> = useMutation({
		mutationKey: ["login"],
		mutationFn: loginCSREP,
		onSuccess: handleValidRep,
	});

	const repRegisterMutation: UseMutationResult<validCSREP, Error, registerCredentials, unknown> = useMutation({
		mutationKey: ["register"],
		mutationFn: registerCSREP,
		onSuccess: handleValidRep,
	});

	function handleValidRep(data: validCSREP) {
		const { token, ...csrep }: validCSREP = data;
		axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		const expiration = new Date(new Date().getTime() + 60000 * 30);
		Cookies.set("repToken", token, { expires: expiration });
		Cookies.set("repInfo", JSON.stringify(csrep), { expires: expiration });
		setRep(csrep);
	}

	const csrep_context: CSREP_context = {
		repLoginMutation,
		repRegisterMutation,
		rep,
	};

	return <CSREP_CONTEXT.Provider value={csrep_context}>{repLoginMutation.isSuccess ? children : null}</CSREP_CONTEXT.Provider>;
}
