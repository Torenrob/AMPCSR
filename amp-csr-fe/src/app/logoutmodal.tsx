import { Button } from "@/components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import { LogOutIcon } from "lucide-react";
import React, { useState } from "react";

export default function LogOutModal({ logout }: { logout: () => void }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button className="bg-sidebar-ring text-primary" onClick={() => setOpen(true)}>
					<LogOutIcon />
					<span id="logOutText">Log Out</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">Are you sure you want to log out?</DialogTitle>
				</DialogHeader>
				<div className="flex w-full justify-between">
					<Button onClick={logout} className="bg-destructive text-destructive-foreground">
						Log Out
					</Button>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
				</div>
			</DialogContent>
			<DialogDescription />
		</Dialog>
	);
}
