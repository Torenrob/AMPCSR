import React, { useContext, useRef, useState } from "react";
import { DataTable } from "../../(repview)/data-table";
import { deletePurchase, EditPurchase, Purchase, PurchaseType, updatePurchase } from "@/services/api/purchase";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { VehicleView } from "./userdetailvehicles";
import DetailPageEditModal from "./detailpageeditmodal";
import { CreateRecentlyViewed, deleteRecentlyViewed, updateRecentlyViewed } from "@/services/api/recentlyviewed";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";

export type PurchaseView = {
	date_time: string;
	amount: string;
	purchase_type: PurchaseType;
	vehicle: string;
	vehicleId: string;
	customerId: string;
	id: string;
};

const columns: ColumnDef<PurchaseView>[] = [
	{
		accessorKey: "date_time",
		enableResizing: true,
		size: 35,
		header: () => <div className="text-center">Date/Time</div>,
	},
	{
		accessorKey: "purchase_type",
		size: 25,
		header: () => <div className="text-center">Type</div>,
	},
	{
		accessorKey: "amount",
		size: 15,
		header: () => <div className="text-center">Amount</div>,
	},
	{
		accessorKey: "vehicle",
		size: 30,
		header: () => <div className="text-center">Vehicle</div>,
	},
];

const schema = z.object({
	vehicleId: z.string().nonempty("Please Select Vehicle"),
	amount: z.coerce.number().positive().default(0),
	purchase_type: z.nativeEnum(PurchaseType),
});

type EditFormInfo = {
	vehicleId: string;
	amount: number;
	purchase_type: PurchaseType;
};

const initPurchaseView = {} as PurchaseView;

export default function UserDetailPurchases({ data, userId, userName }: { data: Purchase[]; userId: string; userName: string }) {
	const openEditFormRef = useRef<{ openEditForm: () => void }>(undefined);
	const [chosenPurchase, setChosenPurchase] = useState<PurchaseView | undefined>(Object.assign(initPurchaseView, data[0]));
	const queryClient = useQueryClient();
	const { rep } = useContext(CSREP_CONTEXT);

	const updateMutation: UseMutationResult<Purchase, Error, EditPurchase, unknown> = useMutation({
		mutationKey: ["updatePurchaseMutation"],
		mutationFn: async (up: EditPurchase): Promise<Purchase> => {
			const recViewPurchaseObj: CreateRecentlyViewed = {
				amount: "$" + up.amount.toFixed(2).toString(),
				customer: userName,
				customerId: chosenPurchase!.customerId,
				date_time: chosenPurchase!.date_time,
				timeViewed: null,
				id: chosenPurchase!.id,
				purchase_type: up.purchase_type,
				recordType: "purchase",
				vehicle: chosenPurchase!.vehicle,
			};
			const [, uP] = await Promise.all([updateRecentlyViewed(rep!.employeeId, recViewPurchaseObj), updatePurchase(up)]);

			return uP;
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["userDetails"] });
		},
	});

	const deleteMutation: UseMutationResult<string, Error, string, unknown> = useMutation({
		mutationKey: ["deletePurchaseMutation"],
		mutationFn: async (purchaseId: string): Promise<string> => {
			const [, dP] = await Promise.all([deleteRecentlyViewed(rep!.employeeId, purchaseId), deletePurchase(purchaseId)]);
			return dP;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userDetails"] });
		},
	});

	const purchaseViewArr: PurchaseView[] = data.map((p) => {
		const purchaseView: PurchaseView = {} as PurchaseView;

		purchaseView.amount = "$" + p.amount.toFixed(2);
		purchaseView.date_time = new Date(p.date_time).toLocaleString();
		purchaseView.purchase_type = p.purchase_type;
		purchaseView.customerId = p.customerId;
		purchaseView.purchase_type = p.purchase_type;
		purchaseView.vehicle = `${p.vehicle.year} ${p.vehicle.make} ${p.vehicle.model}`;
		purchaseView.vehicleId = p.vehicle.id;
		purchaseView.id = p.id;

		return purchaseView;
	});

	function activateEditForm(rowInfo: PurchaseView | VehicleView) {
		const pView = rowInfo as PurchaseView;
		const formInfo: EditFormInfo = {
			amount: +pView.amount.substring(1),
			purchase_type: pView.purchase_type,
			vehicleId: pView.vehicleId,
		};
		setChosenPurchase(rowInfo as PurchaseView);
		form.reset(formInfo);
		openEditFormRef.current!.openEditForm();
	}

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (formValues: z.infer<typeof schema>): void => {
		updateMutation.mutateAsync({ ...formValues, customerId: data[0].customerId, id: chosenPurchase!.id! });
		form.reset();
	};

	return (
		<>
			<DataTable title="Purchase History Count" isDetailTable={true} detailPageActivateEditForm={activateEditForm} columns={columns} data={purchaseViewArr} />
			<DetailPageEditModal
				ref={openEditFormRef}
				userId={userId}
				itemId={chosenPurchase!.id}
				deleteMutation={deleteMutation}
				title="Edit Purchase"
				form={form}
				updateMutation={updateMutation}
				onSubmit={onSubmit}
				schema={schema}
			/>
		</>
	);
}
