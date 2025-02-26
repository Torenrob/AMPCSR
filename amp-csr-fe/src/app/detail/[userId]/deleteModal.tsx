import { Button } from "@/components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import { Spinner } from "@/components/shadcn/spinner";
import React, { useState } from "react";

export default function DeleteModal({ deleteFn, mutationPending, type }: { deleteFn: () => void; mutationPending: boolean; type: string }) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-[15%] bg-destructive text-destructive-foreground">Delete</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this {`${type}`}?{/*  */}
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="flex w-full justify-between">
					<Button onClick={() => deleteFn()} className="bg-destructive text-destructive-foreground">
						{mutationPending ? <Spinner size="small" /> : "Delete"}
					</Button>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
