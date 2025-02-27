"use client";

import React, { useState } from "react";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { Separator } from "@/components/shadcn/separator";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Customer, getAllCustomers, createCustomer, CreateCustomer } from "@/services/api/customer";
import { CustomerTableView, columns } from "./columns";
import AddItemModal from "../additemmodal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);

const schema = z.object({
	first_name: z.string().nonempty("Please Enter First Name"),
	last_name: z.string().nonempty("Please Enter Last Name"),
	email: z.string().email("Invalid Email Address"),
	phone: z.string().regex(phoneRegex, "Phone number format: 123-456-7890").default(""),
});

export default function Customers() {
	const queryClient = useQueryClient();
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const { data, isPending, error } = useQuery({
		queryKey: ["customers"],
		queryFn: getAllCustomers,
	});

	const mutation: UseMutationResult<Customer, Error, CreateCustomer, unknown> = useMutation({
		mutationKey: ["customerMutation"],
		mutationFn: (cc: CreateCustomer): Promise<Customer> => createCustomer(cc),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = (formValues: z.infer<typeof schema>): void => {
		mutation.mutate(formValues);
		setModalOpen(false);
		form.reset();
	};

	const customerViewArr: CustomerTableView[] =
		data?.map((c: Customer) => {
			const customerTableView: CustomerTableView = { customerId: c.id, recordType: "customer" } as CustomerTableView;
			return Object.assign(customerTableView, c);
		}) || [];

	return (
		<>
			<div className="flex w-full">
				<div className="font-extrabold text-2xl mb-2">Users</div>
				<AddItemModal setModalOpen={() => setModalOpen(!modalOpen)} open={modalOpen} title="Add User" form={form} schema={schema} mutation={mutation} onSubmit={onSubmit} />
			</div>
			<Separator className="w-full bg-sidebar-border mb-4" />
			<div className="grow rounded-lg">
				{isPending ? (
					<Skeleton className="w-full h-full" />
				) : error ? (
					<div className="text-center text-destructive">Error loading customers</div>
				) : (
					<DataTable title="User Count" columns={columns} data={customerViewArr} />
				)}
			</div>
		</>
	);
}
