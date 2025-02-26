"use client";

import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecentlyViewed } from "@/services/api/recentlyviewed";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";
import { DataTable } from "../data-table";
import { Separator } from "@/components/shadcn/separator";
import { Skeleton } from "@/components/shadcn/skeleton";
import { columns, RecentlyViewed } from "./columns";

export default function Recent() {
	const { rep } = useContext(CSREP_CONTEXT);
	const { data, isLoading } = useQuery({
		queryKey: ["recentView"],
		queryFn: (): Promise<RecentlyViewed[]> => {
			console.log("Recent View Query Initialized");
			return getAllRecentlyViewed(rep!.employeeId);
		},
	});

	data?.map((x) => (x.timeDisplay = new Date(x.timeViewed).toLocaleString()));

	return (
		<>
			<div className="font-extrabold text-2xl mb-2">Recently Viewed</div>
			<Separator className="w-full bg-sidebar-border mb-4" />
			<div className="grow rounded-lg">{isLoading ? <Skeleton className="w-full h-full" /> : <DataTable title="Recently Viewed Count" columns={columns} data={data!} />}</div>
		</>
	);
}
