import AddItemModal from "@/app/(repview)/additemmodal";
import { CustomerWhole, updateCustomer, UpdateCustomer } from "@/services/api/customer";
import React, { useContext, useEffect } from "react";
import { z } from "zod";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRecentlyViewed, updateRecentlyViewed } from "@/services/api/recentlyviewed";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";

const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);

const schema = z.object({
	first_name: z.string().nonempty("Please Enter First Name"),
	last_name: z.string().nonempty("Please Enter Last Name"),
	email: z.string().email("Invalid Email Address"),
	phone: z.string().regex(phoneRegex, "Phone number format: 123-456-7890").default(""),
});

export default function UserDetail({ data }: { data: CustomerWhole }) {
	const { rep } = useContext(CSREP_CONTEXT);
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
		},
	});

	useEffect(() => {
		form.reset({
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
		});
	}, [data, form]);

	useEffect(() => form.reset(), [form]);

	const mutation: UseMutationResult<void, Error, UpdateCustomer, unknown> = useMutation({
		mutationKey: ["customerUpdateMutation"],
		mutationFn: (uc: UpdateCustomer): Promise<void> => {
			updateCustomer(uc, data.id);
			return updateRecentlyViewed(rep!.employeeId, { ...uc, customerId: data.id, recordType: "customer", id: data.id } as CreateRecentlyViewed);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userDetails"] });
		},
	});

	function onSubmit(values: z.infer<typeof schema>) {
		mutation.mutateAsync(values);
	}

	const leftStyling = "w-[27%] my-10 text-xl pr-2 rounded-l-2xl text-background text-end items-center content-center bg-primary border-sidebar border-2";
	const rightStyling = "w-[73%] text-accent-foreground text-xl text-center content-center my-10 bg-accent border-sidebar rounded-r-sm border-sidebar border-t-2 border-b-2";

	return (
		<div className="w-[35%] h-[90%]  p-4 rounded-lg flex flex-wrap">
			<div className={leftStyling}>First Name:</div>
			<div className={rightStyling}>{data.first_name}</div>
			<div className={leftStyling}>Last Name:</div>
			<div className={rightStyling}>{data.last_name}</div>
			<div className={leftStyling}>Email:</div>
			<div className={rightStyling}>{data.email}</div>
			<div className={leftStyling}>Phone:</div>
			<div className={rightStyling}>{data.phone}</div>
			<div className="flex justify-around w-full">
				<AddItemModal title="Edit User" form={form} mutation={mutation} onSubmit={onSubmit} schema={schema} />
			</div>
		</div>
	);
}
