import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return <Input placeholder=" " className={cn("peer", className)} ref={ref} {...props} />;
});
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<React.ComponentRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(({ className, ...props }, ref) => {
	return (
		<Label
			className={cn(
				"peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & { label?: string; labelClassname?: string; inputClassname?: string };

const FloatingLabelInput = React.forwardRef<React.ComponentRef<typeof FloatingInput>, React.PropsWithoutRef<FloatingLabelInputProps>>(
	({ id, label, labelClassname, inputClassname, ...props }, ref) => {
		return (
			<div className="relative">
				<FloatingInput ref={ref} id={id} {...props} className={inputClassname} />
				<FloatingLabel className={labelClassname} htmlFor={id}>
					{label}
				</FloatingLabel>
			</div>
		);
	}
);
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
