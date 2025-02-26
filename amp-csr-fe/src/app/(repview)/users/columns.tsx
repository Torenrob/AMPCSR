"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CustomerTableView = {
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
	customerId: string;
	recordType: string;
	id: string;
};

export const columns: ColumnDef<CustomerTableView>[] = [
	{
		accessorKey: "first_name",
		enableResizing: true,
		size: 25,
		header: () => <div className="text-center">First Name</div>,
	},
	{
		accessorKey: "last_name",
		size: 25,
		header: () => <div className="text-center">Last Name</div>,
	},
	{
		accessorKey: "phone",
		size: 15,
		header: () => <div className="text-center">Phone Number</div>,
	},
	{
		accessorKey: "email",
		size: 35,
		header: () => <div className="text-center">Email</div>,
	},
];
