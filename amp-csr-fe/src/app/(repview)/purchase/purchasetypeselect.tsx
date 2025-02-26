import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { PurchaseType } from "@/services/api/purchase";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PurchaseTypeSelect({ field }: { field: ControllerRenderProps<any, "purchase_type"> }) {
	return (
		<Select onValueChange={field.onChange} value={field.value}>
			<SelectTrigger className="w-[50%]">
				<SelectValue placeholder="Select Transaction Type" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Transaction Type</SelectLabel>
					{Object.values(PurchaseType).map((p) => {
						return (
							<SelectItem value={`${p}`} key={p}>
								{`${p.replace("_", " ")}`}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
