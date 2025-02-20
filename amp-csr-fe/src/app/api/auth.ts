import axios, { Axios, AxiosResponse } from "axios";

const apiURL = process.env.API_URL + "/auth";

export type validCSREP = {
	employeeId: string;
	first_name: string;
	last_name: string;
	user_name: string;
};

export const loginCSREP = async (): Promise<validCSREP> => {
	const response: AxiosResponse<validCSREP> = await axios.get(apiURL + "/login");
	return response.data;
};

export const registerCSREP = async (): Promise<validCSREP> => {
	const response: AxiosResponse<validCSREP> = await axios.get(apiURL + "/register");
	return response.data;
};
