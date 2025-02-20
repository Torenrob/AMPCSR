import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../shadcn/form";
import { Input } from "../shadcn/input";
import { FloatingLabelInput } from "../shadcn/floatinglabelinput";
import { Button } from "../shadcn/button";

export default function LoginForm({ showRegister }: { showRegister: () => void }) {
	const loginSchema = z.object({
		user_name: z.string(),
		password: z.string(),
	});

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			user_name: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log("submit");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-primary w-[20%] p-3 rounded-2xl h-fit shadow-gray-700 shadow-md">
				<span className="self-center text-xl text-primary-foreground font-semibold">Account Login</span>

				<FormField
					control={form.control}
					name="user_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="user_name" label="Username" labelClassname="bg-primary rounded-3xl" inputClassname="text-primary-foreground" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="password" label="Password" labelClassname="bg-primary rounded-3xl" inputClassname="text-primary-foreground" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-[30%] self-center bg-background text-foreground">
					Submit
				</Button>
				<FormDescription className="text-center border-t-[0.075rem] border-background/25 pt-2 mx-1">
					Dont have an account?{" "}
					<a onClick={showRegister} className="text-input-foreground font-semibold">
						Register
					</a>
				</FormDescription>
			</form>
		</Form>
	);
}
