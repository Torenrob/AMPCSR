import axios, { AxiosResponse } from "axios";

const apiURL = process.env.API_URL + "/auth";

export type loginCredentials = {
	user_name: string;
	password: string;
};

export type registerCredentials = {
	first_name: string;
	last_name: string;
	user_name: string;
	password: string;
};

export type validCSREP = {
	token: string;
	employeeId: string;
	first_name: string;
	last_name: string;
	user_name: string;
};

export const loginCSREP = async (credentials: loginCredentials): Promise<validCSREP> => {
	const response: AxiosResponse<validCSREP> = await axios.post(apiURL + "/login", credentials);
	return response.data;
};

export const registerCSREP = async (credentials: registerCredentials): Promise<validCSREP> => {
	const response: AxiosResponse<validCSREP> = await axios.post(apiURL + "/register", credentials);
	return response.data;
};
