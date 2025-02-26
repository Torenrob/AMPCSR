import { ExcludeProperty } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { Vehicle } from "./vehicle";
import { Purchase } from "./purchase";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/customer";

export type Customer = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	vehicles: ExcludeProperty<Vehicle, "customer" | "purchases">[];
	purchases: ExcludeProperty<Purchase, "customer" | "vehicle">[];
};

export type CustomerWhole = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	vehicles: Vehicle[];
	purchases: Purchase[];
};

export type UpdateCustomer = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
};

export type CreateCustomer = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
};

export const getAllCustomers = async (): Promise<Customer[]> => {
	const response: AxiosResponse<Customer[]> = await axios.get(apiURL);
	return response.data;
};

export const createCustomer = async (cc: CreateCustomer): Promise<Customer> => {
	const response: AxiosResponse<Customer> = await axios.post(apiURL, cc);
	return response.data;
};

export const getCustomerById = async (customerId: string): Promise<CustomerWhole> => {
	const response: AxiosResponse<CustomerWhole> = await axios.get(`${apiURL}/${customerId}`);
	return response.data;
};

export const updateCustomer = async (uc: UpdateCustomer, customerId: string): Promise<UpdateCustomer> => {
	const response: AxiosResponse<UpdateCustomer> = await axios.patch(apiURL + "/" + customerId, uc);
	return response.data;
};

export const deleteCustomer = async (id: string): Promise<string> => {
	const response: AxiosResponse<string> = await axios.delete(apiURL + "/" + id);
	return response.data;
};
