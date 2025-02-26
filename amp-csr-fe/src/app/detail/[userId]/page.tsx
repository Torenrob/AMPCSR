"use client";

import { Separator } from "@/components/shadcn/separator";
import React, { useContext } from "react";
import UserDetail from "./userdetail";
import { useParams, useRouter } from "next/navigation";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, getCustomerById } from "@/services/api/customer";
import { Skeleton } from "@/components/shadcn/skeleton";
import UserDetailVehicles from "./userdetailvehicles";
import UserDetailPurchases from "./userdetailpurchases";
import DeleteModal from "./deleteModal";
import { deleteRecentlyViewed } from "@/services/api/recentlyviewed";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";

export default function DetailPage() {
	const { userId } = useParams<{ userId: string }>();
	const { rep } = useContext(CSREP_CONTEXT);
	const router = useRouter();
	const queryClient = useQueryClient();

	const { data, isPending, error } = useQuery({
		queryKey: ["userDetails"],
		queryFn: () => {
			return getCustomerById(userId);
		},
	});

	const deleteUserMutation: UseMutationResult<string, Error, string, unknown> = useMutation({
		mutationKey: ["deleteUserMutation"],
		mutationFn: (customerId: string): Promise<string> => {
			deleteRecentlyViewed(rep!.employeeId, customerId);
			return deleteCustomer(customerId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers", "vehicles", "purchases", "recentView"] });
		},
	});

	function deleteUser() {
		router.push("/recent");
		deleteUserMutation.mutate(userId);
	}

	return (
		<div className="grow p-20 flex">
			<div className="grow flex flex-col bg-sidebar rounded-lg border-sidebar-border">
				<div className="w-full min-h-[7%] text-3xl px-10 text-primary items-center flex justify-between">
					<div>User Detail</div>
					<div>{`${data?.first_name} ${data?.last_name}`}</div>
					<DeleteModal deleteFn={deleteUser} mutationPending={deleteUserMutation.isPending} type="user account" />
				</div>
				<Separator className="border-sidebar-border w-[98%] self-center" />
				<div className="grow p-10 flex">
					{isPending ? (
						<Skeleton className="w-full h-full" />
					) : error ? (
						<div className="text-center text-destructive"> Error Loading User Details</div>
					) : (
						<>
							<UserDetail data={data} />
							<Separator orientation="vertical" className="h-[95%] self-center ml-16 mr-16" />
							<div className="grow flex flex-col justify-between">
								<div className="h-[45%] w-full text-primary rounded-md">
									<div className="w-full text-center text-2xl mb-2">User Vehicles</div>
									<UserDetailVehicles data={data.vehicles} userId={userId} userName={`${data.first_name} ${data.last_name}`} />
								</div>
								<div className="h-[45%] w-full text-primary rounded-md">
									<div className="w-full text-center text-2xl mb-2">User Purchase History</div>
									<UserDetailPurchases data={data.purchases} userId={userId} userName={`${data.first_name} ${data.last_name}`} />
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
