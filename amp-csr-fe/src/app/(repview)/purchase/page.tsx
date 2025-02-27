"use client";

import React from "react";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { Separator } from "@/components/shadcn/separator";
import { Skeleton } from "@/components/shadcn/skeleton";
import { columns, PurchaseTableView } from "./columns";
import { CreatePurchase, createPurchase, getAllPurchases, Purchase, PurchaseType } from "@/services/api/purchase";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddItemModal from "../additemmodal";

const schema = z.object({
	customerId: z.string().nonempty("Please select Customer"),
	vehicleId: z.string().nonempty("Please Select Vehicle"),
	amount: z.coerce.number().positive().default(0),
	purchase_type: z.nativeEnum(PurchaseType),
});

export default function Purchases() {
	const queryClient = useQueryClient();

	const { data, isPending, error } = useQuery({
		queryKey: ["purchases"],
		queryFn: () => {
			return getAllPurchases();
		},
	});

	const mutation: UseMutationResult<Purchase, Error, CreatePurchase, unknown> = useMutation({
		mutationKey: ["purchaseMutation"],
		mutationFn: (cp: CreatePurchase): Promise<Purchase> => createPurchase(cp),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["purchases"] });
		},
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			customerId: "",
			vehicleId: "",
			amount: 0,
		},
	});

	const onSubmit = (formValues: z.infer<typeof schema>): void => {
		mutation.mutateAsync({ ...formValues });
		form.reset();
	};

	const purchaseViewArr: PurchaseTableView[] =
		data?.map((p) => {
			const purchaseTableView: PurchaseTableView = {
				amount: "$" + p.amount.toFixed(2),
				customer: p.customer.first_name + " " + p.customer.last_name,
				date_time: new Date(p.date_time).toLocaleString(),
				vehicle: p.vehicle.year + " " + p.vehicle.make + " " + p.vehicle.model,
				purchase_type: p.purchase_type,
				customerId: p.customer.id,
				id: p.id,
				recordType: "purchase",
			};

			return purchaseTableView;
		}) || [];

	return (
		<>
			<div className="flex w-full">
				<div className="font-extrabold text-2xl mb-2">Purchase History</div>
				<AddItemModal title="Add Transaction" form={form} schema={schema} mutation={mutation} onSubmit={onSubmit} />
			</div>
			<Separator className="w-full bg-sidebar-border mb-4" />
			<div className="grow rounded-lg">
				{isPending ? (
					<Skeleton className="w-full h-full" />
				) : error ? (
					<div className="text-center text-destructive">Error loading purchases</div>
				) : (
					<DataTable title="Transaction Count" columns={columns} data={purchaseViewArr} />
				)}
			</div>
		</>
	);
}
