import React, { useContext, useRef, useState } from "react";
import { DataTable } from "../../(repview)/data-table";
import { deleteVehicle, updateVehicle, UpdateVehicle, Vehicle } from "@/services/api/vehicle";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { PurchaseView } from "./userdetailpurchases";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DetailPageEditModal from "./detailpageeditmodal";
import { CreateRecentlyViewed, deleteRecentlyViewed, updateRecentlyViewed } from "@/services/api/recentlyviewed";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";

export type VehicleView = {
	make: string;
	model: string;
	year: string;
	isSubscribed: boolean;
	customerId: string;
	id: string;
};

const columns: ColumnDef<VehicleView>[] = [
	{
		accessorKey: "make",
		enableResizing: true,
		size: 35,
		header: () => <div className="text-center">Make</div>,
	},
	{
		accessorKey: "model",
		size: 35,
		header: () => <div className="text-center">Model</div>,
	},
	{
		accessorKey: "year",
		size: 15,
		header: () => <div className="text-center">Year</div>,
	},
	{
		accessorKey: "isSubscribed",
		size: 15,
		header: () => <div className="text-center">Subscription</div>,
		cell: () => {},
	},
];

const regex = new RegExp(/^\d{4}$/);

const schema = z.object({
	make: z.string().nonempty("Please Enter Make"),
	model: z.string().nonempty("Please Enter Model"),
	year: z.string().regex(regex, "Please Enter Valid Year"),
	isSubscribed: z.boolean(),
});

type EditFormInfo = {
	make: string;
	model: string;
	year: string;
	isSubscribed: boolean;
};

const initVehicleView = {} as VehicleView;

export default function UserDetailVehicles({ data, userId, userName }: { data: Vehicle[]; userId: string; userName: string }) {
	const queryClient = useQueryClient();
	const { rep } = useContext(CSREP_CONTEXT);
	const openEditFormRef = useRef<{ openEditForm: () => void }>(undefined);
	const [chosenVehicle, setChosenVehicle] = useState<VehicleView>(initVehicleView);

	const updateMutation: UseMutationResult<Vehicle, Error, UpdateVehicle, unknown> = useMutation({
		mutationKey: ["updateVehicleMutation"],
		mutationFn: async (uV: UpdateVehicle): Promise<Vehicle> => {
			const recViewVehicleObj: CreateRecentlyViewed = {
				customer: userName,
				customerId: userId,
				id: uV.id,
				isSubscribed: uV.isSubscribed,
				make: uV.make,
				model: uV.model,
				recordType: "vehicle",
				year: uV.year,
				timeViewed: null,
			};
			const [, upV] = await Promise.all([updateRecentlyViewed(rep!.employeeId, recViewVehicleObj), updateVehicle(uV)]);

			return upV;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userDetails"] });
		},
	});

	const deleteMutation: UseMutationResult<string, Error, string, unknown> = useMutation({
		mutationKey: ["deleteVehicleMutation"],
		mutationFn: async (vehicleId: string): Promise<string> => {
			const [, dV] = await Promise.all([deleteRecentlyViewed(rep!.employeeId, chosenVehicle!.id), deleteVehicle(vehicleId)]);
			return dV;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userDetails"] });
		},
	});

	const vehicleViewArr: VehicleView[] = data.map((v) => {
		const vehicleView: VehicleView = {} as VehicleView;
		const x: VehicleView = Object.assign(vehicleView, v);

		return x;
	});

	function activateEditForm(rowInfo: PurchaseView | VehicleView) {
		const vView = rowInfo as VehicleView;
		const formInfo: EditFormInfo = {
			make: vView.make,
			model: vView.model,
			year: vView.year,
			isSubscribed: vView.isSubscribed,
		};
		setChosenVehicle(vView);
		form.reset(formInfo);
		openEditFormRef.current?.openEditForm();
	}

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (formValues: z.infer<typeof schema>): void => {
		updateMutation.mutateAsync({ ...formValues, id: chosenVehicle.id! });
		form.reset();
	};

	return (
		<>
			<DataTable title="Vehicle Count" isDetailTable={true} detailPageActivateEditForm={activateEditForm} columns={columns} data={vehicleViewArr} />
			<DetailPageEditModal
				ref={openEditFormRef}
				title="Edit Vehicle"
				form={form}
				deleteMutation={deleteMutation}
				itemId={chosenVehicle!.id}
				updateMutation={updateMutation}
				onSubmit={onSubmit}
				schema={schema}
			/>
		</>
	);
}
