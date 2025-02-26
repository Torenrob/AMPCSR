"use client";

import { ColumnDef } from "@tanstack/react-table";

export enum RecordType {
	CUST = "Customer",
	VEH = "Vehicle",
	PUR = "Purchase",
}

export type RecentlyViewed = {
	id: string;
	recordType: RecordType;
	recordDetail: string;
	timeViewed: Date;
	timeDisplay: string;
	customerId: string;
};

export const columns: ColumnDef<RecentlyViewed>[] = [
	{
		accessorKey: "recordType",
		enableResizing: true,
		size: 10,
		header: () => <div className="text-center">Record Type</div>,
	},
	{
		accessorKey: "recordDetail",
		size: 68,
		header: () => <div className="text-center">Description</div>,
	},
	{
		accessorKey: "timeDisplay",
		size: 20,
		header: () => <div className="text-center">Last Viewed</div>,
	},
];
