import { validCSREP } from "@/services/api/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setTokenHeader(token: string) {
	axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export function setValidRepCookies(data: validCSREP) {
	const { token, ...csrep }: validCSREP = data;
	const expiration = new Date(new Date().getTime() + 60000 * 30);
	Cookies.set("repToken", token, { expires: expiration });
	Cookies.set("repInfo", JSON.stringify(csrep), { expires: expiration });
}
