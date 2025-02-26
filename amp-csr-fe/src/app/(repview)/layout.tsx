"use client";

import React, { ReactNode } from "react";

export default function RepViewLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex grow py-10 px-48">
			<div className="grow flex flex-col text-primary bg-sidebar border-sidebar-border border-[1px] rounded-xl p-6">{children}</div>
		</div>
	);
}
