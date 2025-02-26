import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { getAllCustomers } from "@/services/api/customer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomerIdSelect({ field }: { field: ControllerRenderProps<any, "customerId"> }) {
	const {
		data: customerData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["customers"],
		queryFn: getAllCustomers,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading customers</div>;
	}

	return (
		<Select onValueChange={field.onChange} value={field.value} name="customerId">
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select Customer" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Customer</SelectLabel>
					{customerData!.map((cust) => {
						return (
							<SelectItem value={cust.id} key={cust.id}>
								{`${cust.first_name} ${cust.last_name}`}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
