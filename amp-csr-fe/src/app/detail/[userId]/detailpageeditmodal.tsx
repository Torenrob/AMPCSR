/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/shadcn/dialog";
import { FloatingLabelInput } from "@/components/shadcn/floatinglabelinput";
import { Form, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import { Spinner } from "@/components/shadcn/spinner";

import { UseMutationResult } from "@tanstack/react-query";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SubscribeCheck } from "../../(repview)/vehicles/subscribecheck";
import CustomerIdSelect from "../../(repview)/vehicles/customeridselect";
import VehicleSelect from "../../(repview)/purchase/vehicleselect";
import PurchaseTypeSelect from "../../(repview)/purchase/purchasetypeselect";
import { DialogDescription } from "@radix-ui/react-dialog";
import DeleteModal from "./deleteModal";

type DetailEditPageProps = {
	title: string;
	onSubmit: (values: z.infer<any>) => void;
	updateMutation: UseMutationResult<any, Error, any, unknown>;
	deleteMutation: UseMutationResult<any, Error, any, unknown>;
	form: UseFormReturn<z.infer<any>>;
	schema: z.ZodObject<any>;
	userId?: string;
	itemId: string;
};

export const DetailPageEditModal = forwardRef((props: DetailEditPageProps, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		openEditForm() {
			setOpen(true);
		},
	}));

	const keys = Object.keys(props.schema.shape);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogDescription></DialogDescription>
				<DialogHeader>
					<DialogTitle className="text-center">{props.title}</DialogTitle>
				</DialogHeader>
				<Form {...props.form}>
					<form key={props.title} onSubmit={props.form.handleSubmit(props.onSubmit)} className="flex flex-col gap-2 w-full p-3 rounded-2xl h-fit border-[1px] border-sidebar-border">
						{keys.map((k, i) => {
							return (
								<React.Fragment key={`${k}-${i}`}>
									{k === "customerId" ? (
										<FormField
											key={`${i}${props.title}`}
											control={props.form.control}
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
											key={`${i}${props.title}`}
											control={props.form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<SubscribeCheck field={field} />
												</FormItem>
											)}
										/>
									) : k === "vehicleId" ? (
										<FormField
											key={`${i}${props.title}`}
											control={props.form.control}
											name={`${k}`}
											render={({ field }) => (
												<FormItem>
													<VehicleSelect field={field} userId={props.userId!} />
													<FormMessage></FormMessage>
												</FormItem>
											)}
										/>
									) : k === "purchase_type" ? (
										<FormField
											key={`${i}${props.title}`}
											control={props.form.control}
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
											key={`${i}${props.title}`}
											control={props.form.control}
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
						<div className="flex w-full px-2 justify-around">
							<Button type="submit" onClick={() => setOpen(false)} className="w-[30%] self-center bg-sidebar-ring">
								{props.updateMutation.isPending ? <Spinner size="small" /> : "Submit"}
							</Button>
							<DeleteModal
								deleteFn={() => {
									props.deleteMutation.mutate(props.itemId);
									setOpen(false);
								}}
								type={props.title.substring(5).toLowerCase()}
								mutationPending={props.deleteMutation.isPending}
							/>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
});

DetailPageEditModal.displayName = "DetailPageEditModal";

export default DetailPageEditModal;
