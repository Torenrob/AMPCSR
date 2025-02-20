import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormDescription, FormField, FormItem } from "../shadcn/form";
import { FloatingLabelInput } from "../shadcn/floatinglabelinput";
import { Button } from "../shadcn/button";
import { Spinner } from "../shadcn/spinner";
import { validCSREP, loginCredentials, loginCSREP } from "@/services/api/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setTokenHeader, setValidRepCookies } from "@/lib/utils";

const loginSchema = z.object({
	user_name: z.string(),
	password: z.string(),
});

export default function LoginForm({ showRegister }: { showRegister: () => void }) {
	const router = useRouter();

	const repLoginMutation: UseMutationResult<validCSREP, Error, loginCredentials, unknown> = useMutation({
		mutationKey: ["login"],
		mutationFn: loginCSREP,
		onSuccess: (data) => {
			setTokenHeader(data.token);
			setValidRepCookies(data);
			router.push("/home");
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		repLoginMutation.mutateAsync(values);
	}

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			user_name: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-sidebar w-[20%] p-3 rounded-2xl h-fit shadow-gray-700 shadow-md">
				<span className="self-center text-xl text-primary font-semibold">Employee Login</span>

				<FormField
					control={form.control}
					name="user_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="user_name" label="Username" labelClassname="bg-sidebar rounded-3xl" inputClassname="text-primary border-primary" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} type="password" id="password" label="Password" labelClassname="bg-sidebar rounded-3xl" inputClassname="text-primary border-primary" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-[30%] self-center bg-sidebar-ring text-primary-foreground">
					{repLoginMutation.isPending ? <Spinner size="small" /> : "Submit"}
				</Button>
				<FormDescription className="text-center">
					Dont have an account?{" "}
					<a onClick={showRegister} className="text-sidebar-ring font-semibold cursor-pointer">
						Register
					</a>
				</FormDescription>
			</form>
		</Form>
	);
}
