"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import GreenCheckIcon from "@/components/icons/greencheckicon";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { createRecentlyViewed, CreateRecentlyViewed } from "@/services/api/recentlyviewed";
import { VehicleTableView } from "./vehicles/columns";
import { PurchaseTableView } from "./purchase/columns";
import { CustomerTableView } from "./users/columns";
import { RecentlyViewed } from "./recent/columns";
import { PurchaseView } from "../detail/[userId]/userdetailpurchases";
import { VehicleView } from "../detail/[userId]/userdetailvehicles";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData extends { customerId: string }, TValue>({
	columns,
	data,
	title,
	isDetailTable,
	detailPageActivateEditForm,
}: DataTableProps<TData, TValue> & { title: string; isDetailTable?: boolean; detailPageActivateEditForm?: (v: PurchaseView | VehicleView) => void }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const queryClient = useQueryClient();
	const router = useRouter();
	const { rep } = useContext(CSREP_CONTEXT);

	const mutation: UseMutationResult<void, Error, CreateRecentlyViewed, unknown> = useMutation({
		mutationKey: ["recentlyViewedMutation"],
		mutationFn: (crv: CreateRecentlyViewed): Promise<void> => createRecentlyViewed(rep!.employeeId, crv),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["recentView"] });
		},
	});

	async function visitLinkDetail(row: VehicleTableView | PurchaseTableView | CustomerTableView | RecentlyViewed | PurchaseView | VehicleView) {
		if (isDetailTable) {
			detailPageActivateEditForm!(row as PurchaseView | VehicleView);
			return;
		}
		const recentView: CreateRecentlyViewed = { ...(row as VehicleTableView | PurchaseTableView | CustomerTableView | RecentlyViewed), timeViewed: new Date() };
		mutation.mutateAsync(recentView);
		router.push(`/detail/${row.customerId}`);
	}

	return (
		<div className="rounded-md border bg-accent">
			<Table>
				<TableHeader className="border-b-[1.5px] border-b-sidebar">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header, index) => {
								return (
									<React.Fragment key={header.id}>
										{index === 0 && (
											<TableHead className={`${index === 0 ? "" : "border-l-[1.5px]"} border-sidebar w-[2%]`} key={`${header.id}#`}>
												#
											</TableHead>
										)}
										<TableHead style={{ width: `${header.column.columnDef.size}%` }} className={`${index === 0 ? "" : "border-l-[1.5px]"} border-sidebar`} key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									</React.Fragment>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, ind) => (
							<TableRow
								onClick={() => visitLinkDetail(row.original as unknown as PurchaseTableView | VehicleTableView | CustomerTableView)}
								className="hover:bg-sidebar/50 cursor-pointer active:scale-x-[99%] active:scale-y-[85%]"
								key={`${row.id}${ind}`}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell, index) => (
									<React.Fragment key={cell.id}>
										{index === 0 && (
											<TableCell className="text-center" key={`${cell.id}#`}>
												{ind + 1}
											</TableCell>
										)}
										<TableCell className="text-center" key={cell.id}>
											{cell.getContext().getValue() === true ? (
												<div className="w-full h-full flex justify-center">
													<GreenCheckIcon />
												</div>
											) : cell.getContext().getValue() === false ? (
												""
											) : (
												flexRender(cell.column.columnDef.cell, cell.getContext())
											)}
										</TableCell>
									</React.Fragment>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="bg-sidebar rounded-md h-10 text-center justify-center m-2 p-2">
				{title}: {data.length}
			</div>
		</div>
	);
}
