import { ExcludeProperty } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { Customer } from "./customer";
import { Vehicle } from "./vehicle";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/purchase";

export enum PurchaseType {
	SUB = "SUBSCRIPTION",
	SINGWASH = "SINGLE_WASH",
	RFD = "REFUND",
	OTH = "OTHER",
}

export type Purchase = {
	customerId: string;
	id: string;
	date_time: Date;
	amount: number;
	purchase_type: PurchaseType;
	customer: ExcludeProperty<Customer, "purchases" | "vehicles">;
	vehicle: ExcludeProperty<Vehicle, "customer" | "purchases">;
};

export type CreatePurchase = {
	customerId: string;
	vehicleId?: string;
	amount: number;
	purchase_type: PurchaseType;
};

export type EditPurchase = {
	customerId: string;
	vehicleId?: string;
	amount: number;
	purchase_type: PurchaseType;
	id: string;
};

export const getAllPurchases = async (): Promise<Purchase[]> => {
	const response: AxiosResponse<Purchase[]> = await axios.get(apiURL);
	return response.data;
};

export const createPurchase = async (cp: CreatePurchase): Promise<Purchase> => {
	const response: AxiosResponse<Purchase> = await axios.post(apiURL, cp);
	return response.data;
};

export const updatePurchase = async (updatePurchase: EditPurchase): Promise<Purchase> => {
	console.log(updatePurchase);
	const response: AxiosResponse<Purchase> = await axios.patch(apiURL + "/" + updatePurchase.id, updatePurchase);
	return response.data;
};

export const deletePurchase = async (purchaseId: string): Promise<string> => {
	const response: AxiosResponse<string> = await axios.delete(apiURL + "/" + purchaseId);
	return response.data;
};
