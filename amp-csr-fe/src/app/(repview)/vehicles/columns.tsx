"use client";

import { ColumnDef } from "@tanstack/react-table";

export type VehicleTableView = {
	id: string;
	recordType: string;
	make: string;
	model: string;
	year: string;
	isSubscribed: boolean;
	customer: string;
	customerId: string;
};

export const columns: ColumnDef<VehicleTableView>[] = [
	{
		accessorKey: "make",
		enableResizing: true,
		size: 22.5,
		header: () => <div className="text-center">Make</div>,
	},
	{
		accessorKey: "model",
		size: 22.5,
		header: () => <div className="text-center">Model</div>,
	},
	{
		accessorKey: "year",
		size: 10,
		header: () => <div className="text-center">Year</div>,
	},
	{
		accessorKey: "customer",
		size: 30,
		header: () => <div className="text-center">Customer</div>,
	},
	{
		accessorKey: "isSubscribed",
		size: 15,
		header: () => <div className="text-center">Subscription</div>,
		cell: () => {},
	},
];
