import axios, { AxiosResponse } from "axios";
import { RecentlyViewed } from "@/app/(repview)/recent/columns";
import { PurchaseTableView } from "@/app/(repview)/purchase/columns";
import { CustomerTableView } from "@/app/(repview)/users/columns";
import { VehicleTableView } from "@/app/(repview)/vehicles/columns";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/csrep/recentlyviewed";

export type CreateRecentlyViewed = (PurchaseTableView | CustomerTableView | VehicleTableView | RecentlyViewed) & { timeViewed: Date | null };

export const getAllRecentlyViewed = async (employeeId: string): Promise<RecentlyViewed[]> => {
	const response: AxiosResponse<RecentlyViewed[]> = await axios.get(apiURL + `/${employeeId}`);
	return response.data;
};

export const createRecentlyViewed = async (employeeId: string, createRecentView: CreateRecentlyViewed): Promise<void> => {
	await axios.post(apiURL + `/${employeeId}`, createRecentView);
};

export const updateRecentlyViewed = async (employeeId: string, createRecentView: CreateRecentlyViewed): Promise<void> => {
	await axios.patch(apiURL + `/${employeeId}`, createRecentView);
};

export const deleteRecentlyViewed = async (employeeId: string, recordId: string): Promise<void> => {
	await axios.patch(apiURL + `/delete/${employeeId}/${recordId}`);
};
