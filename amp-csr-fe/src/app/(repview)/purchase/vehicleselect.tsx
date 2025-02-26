import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { getAllVehicles } from "@/services/api/vehicle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VehicleSelect({ field, userId }: { field: ControllerRenderProps<any, "vehicleId">; userId: string }) {
	const {
		data: vehicleData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["vehicles"],
		queryFn: getAllVehicles,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading vehicles</div>;
	}

	return (
		<Select onValueChange={field.onChange} value={field.value} name="vehicleId">
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select Vehicle" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Vehicle</SelectLabel>
					{vehicleData!.map((vehicle) => {
						{
							if (vehicle.customer.id === userId)
								return (
									<SelectItem value={vehicle.id} key={vehicle.id}>
										{`${vehicle.make} ${vehicle.model} (${vehicle.year})`}
									</SelectItem>
								);
						}
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
