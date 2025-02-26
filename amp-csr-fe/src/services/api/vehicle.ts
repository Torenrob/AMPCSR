import axios, { AxiosResponse } from "axios";
import { Customer } from "./customer";
import { ExcludeProperty } from "@/lib/utils";
import { Purchase } from "./purchase";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/vehicle";

export type Vehicle = {
	id: string;
	make: string;
	model: string;
	year: string;
	isSubscribed: boolean;
	customer: ExcludeProperty<Customer, "purchases" | "vehicles">;
	purchases: ExcludeProperty<Purchase, "customer" | "vehicle">[];
};

export type CreateVehicle = {
	customerId: string;
	make: string;
	model: string;
	year: string;
	isSubscribed: boolean;
};

export type UpdateVehicle = {
	make: string;
	model: string;
	year: string;
	isSubscribed: boolean;
	id: string;
};

export const getAllVehicles = async (): Promise<Vehicle[]> => {
	const response: AxiosResponse<Vehicle[]> = await axios.get(apiURL);
	return response.data;
};

export const createVehicle = async (createVehicle: CreateVehicle): Promise<Vehicle> => {
	const response: AxiosResponse<Vehicle> = await axios.post(apiURL, createVehicle);
	return response.data;
};

export const updateVehicle = async (cv: UpdateVehicle): Promise<Vehicle> => {
	const response: AxiosResponse<Vehicle> = await axios.patch(apiURL + "/" + cv.id, cv);
	return response.data;
};

export const deleteVehicle = async (vehicleId: string): Promise<string> => {
	const response: AxiosResponse<string> = await axios.delete(apiURL + "/" + vehicleId);
	return response.data;
};
