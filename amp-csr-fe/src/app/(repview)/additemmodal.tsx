/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import { FloatingLabelInput } from "@/components/shadcn/floatinglabelinput";
import { Form, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import { Spinner } from "@/components/shadcn/spinner";

import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SubscribeCheck } from "./vehicles/subscribecheck";
import CustomerIdSelect from "./vehicles/customeridselect";
import VehicleSelect from "./purchase/vehicleselect";
import PurchaseTypeSelect from "./purchase/purchasetypeselect";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddItemModal({
	title,
	onSubmit,
	mutation,
	form,
	schema,
	open,
	setModalOpen,
}: {
	title: string;
	onSubmit: (values: z.infer<any>) => void;
	mutation: UseMutationResult<any, Error, any, unknown>;
	form: UseFormReturn<z.infer<any>>;
	schema: z.ZodObject<any>;
	open: boolean;
	setModalOpen: () => void;
}) {
	const keys = Object.keys(schema.shape);

	const selectedCustomer = form.watch("customerId");

	return (
		<Dialog open={open} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button className="h-[60%] bg-primary ml-2 mt-1">{title === "Edit User" ? "Edit" : "Add"}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogDescription></DialogDescription>
				<DialogHeader>
					<DialogTitle className="text-center">{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form key={title} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full p-3 rounded-2xl h-fit border-[1px] border-sidebar-border">
						{keys.map((k, i) => {
							return (
								<React.Fragment key={`${k}-${i}`}>
									{k === "customerId" ? (
										<FormField
											key={`${i}${title}`}
											control={form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<CustomerIdSelect field={field} />
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									) : k === "isSubscribed" ? (
										<FormField
											key={`${i}${title}`}
											control={form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<SubscribeCheck field={field} />
												</FormItem>
											)}
										/>
									) : k === "vehicleId" ? (
										<FormField
											key={`${i}${title}`}
											control={form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<VehicleSelect field={field} userId={selectedCustomer} />
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									) : k === "purchase_type" ? (
										<FormField
											key={`${i}${title}`}
											control={form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<PurchaseTypeSelect field={field} />
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									) : (
										<FormField
											key={`${i}${title}`}
											control={form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<FloatingLabelInput
														{...field}
														id={`${k}`}
														label={`${k.toUpperCase().replace("_", " ")}`}
														labelClassname="bg-sidebar rounded-3xl"
														inputClassname="text-primary border-sidebar-border"
														type={k === "amount" ? "number" : "text"}
													/>
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									)}
								</React.Fragment>
							);
						})}
						<Button type="submit" className="w-[30%] self-center bg-sidebar-ring">
							{mutation.isPending ? <Spinner size="small" /> : "Submit"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
