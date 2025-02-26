"use client";

import { Checkbox } from "@/components/shadcn/checkbox";
import { ControllerRenderProps } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SubscribeCheck({ field }: { field: ControllerRenderProps<any, "isSubscribed"> }) {
	return (
		<div className="flex flex-col items-center space-x-2">
			<label htmlFor="terms" className="text-sm mb-2 self-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				Subscribe Vehicle
			</label>
			<Checkbox onCheckedChange={field.onChange} checked={field.value} name="isSubscribed" id="subscription" />
		</div>
	);
}
