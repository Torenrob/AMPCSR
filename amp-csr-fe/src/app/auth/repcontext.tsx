import { UseMutationResult } from "@tanstack/react-query";
import { createContext } from "react";
import { loginCredentials, registerCredentials } from "../api/auth";

export type CSREP_context = {
	repLoginMutation: UseMutationResult<CSREP, Error, loginCredentials, unknown>;
	repRegisterMutation: UseMutationResult<CSREP, Error, registerCredentials, unknown>;
	rep: CSREP | null;
};

export type CSREP = {
	employeeId: string;
	first_name: string;
	last_name: string;
	user_name: string;
};

export const CSREP_CONTEXT = createContext<CSREP_context>({} as CSREP_context);
