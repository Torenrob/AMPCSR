"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import DarkModeIcon from "../icons/darkmodeicon";
import LightModeIcon from "../icons/lightmodeicon";

const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(({ className, ...props }, ref) => {
	return (
		<SwitchPrimitives.Root
			className={cn(
				"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-input data-[state=unchecked]:bg-primary",
				className
			)}
			{...props}
			ref={ref}>
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none flex items-center h-5 w-5 rounded-full bg-input dark:bg-primary shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.125rem] data-[state=unchecked]:translate-x-0"
				)}>
				<span>{props.checked ? <DarkModeIcon /> : <LightModeIcon />}</span>
			</SwitchPrimitives.Thumb>
		</SwitchPrimitives.Root>
	);
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
