"use client";

import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { Separator } from "@/components/shadcn/separator";
import { Skeleton } from "@/components/shadcn/skeleton";
import { createVehicle, CreateVehicle, getAllVehicles, Vehicle } from "@/services/api/vehicle";
import { VehicleTableView, columns } from "./columns";

import AddItemModal from "../additemmodal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const regex = new RegExp(/^\d{4}$/);

const schema = z.object({
	customerId: z.string().nonempty("Please Select Customer"),
	make: z.string().nonempty("Please Enter Make"),
	model: z.string().nonempty("Please Enter Model"),
	year: z.string().regex(regex, "Please Enter Valid Year"),
	isSubscribed: z.boolean(),
});

export default function Vehicles() {
	const queryClient = useQueryClient();

	const { data, isPending, error } = useQuery({
		queryKey: ["vehicles"],
		queryFn: getAllVehicles,
	});

	const mutation: UseMutationResult<Vehicle, Error, CreateVehicle, unknown> = useMutation({
		mutationKey: ["vehicleMutation"],
		mutationFn: (cv: CreateVehicle): Promise<Vehicle> => createVehicle(cv),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vehicles"] });
		},
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			customerId: "",
			make: "",
			model: "",
			year: "",
			isSubscribed: false,
		},
	});

	const onSubmit = (formValues: z.infer<typeof schema>): void => {
		mutation.mutateAsync(formValues);
		form.reset();
	};

	const vehicleViewArr: VehicleTableView[] =
		data?.map((v) => {
			const vehicleTableView: VehicleTableView = {
				customerId: v.customer.id,
				recordType: "vehicle",
			} as VehicleTableView;
			return { ...Object.assign(vehicleTableView, v), customer: v.customer.first_name + " " + v.customer.last_name };
		}) || [];

	return (
		<>
			<div className="flex w-full">
				<div className="font-extrabold text-2xl mb-2">Vehicles</div>
				<AddItemModal title="Add Vehicle" form={form} schema={schema} mutation={mutation} onSubmit={onSubmit} />
			</div>
			<Separator className="w-full bg-sidebar-border mb-4" />
			<div className="grow rounded-lg">
				{isPending ? (
					<Skeleton className="w-full h-full" />
				) : error ? (
					<div className="text-center text-destructive">Error loading vehicles</div>
				) : (
					<DataTable title="Vehicle Count" columns={columns} data={vehicleViewArr} />
				)}
			</div>
		</>
	);
}
