"use client";

import { PurchaseType } from "@/services/api/purchase";
import { ColumnDef } from "@tanstack/react-table";

export type PurchaseTableView = {
	id: string;
	date_time: string;
	amount: string;
	purchase_type: PurchaseType;
	customer: string;
	vehicle: string;
	customerId: string;
	recordType: string;
};

export const columns: ColumnDef<PurchaseTableView>[] = [
	{
		accessorKey: "date_time",
		enableResizing: true,
		size: 20,
		header: () => <div className="text-center">Date/Time</div>,
	},
	{
		accessorKey: "purchase_type",
		size: 20,
		header: () => <div className="text-center">Type</div>,
	},
	{
		accessorKey: "amount",
		size: 15,
		header: () => <div className="text-center">Amount</div>,
	},
	{
		accessorKey: "customer",
		size: 20,
		header: () => <div className="text-center">Customer</div>,
	},
	{
		accessorKey: "vehicle",
		size: 25,
		header: () => <div className="text-center">Vehicle</div>,
	},
];
