import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormDescription, FormField, FormItem } from "../shadcn/form";
import { FloatingLabelInput } from "../shadcn/floatinglabelinput";
import { Button } from "../shadcn/button";
import { validCSREP, registerCredentials, registerCSREP } from "@/services/api/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { Spinner } from "../shadcn/spinner";
import { useRouter } from "next/navigation";
import { setTokenHeader, setValidRepCookies } from "@/lib/utils";

const registerSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	user_name: z.string(),
	password: z.string(),
});

export default function RegisterForm({ showLogin }: { showLogin: () => void }) {
	const router = useRouter();

	const repRegisterMutation: UseMutationResult<validCSREP, Error, registerCredentials, unknown> = useMutation({
		mutationKey: ["register"],
		mutationFn: registerCSREP,
		onSuccess: (data) => {
			setTokenHeader(data.token);
			setValidRepCookies(data);
			router.push("/home");
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		repRegisterMutation.mutateAsync(values);
	}

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			user_name: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-secondary w-[20%] p-3 rounded-2xl h-fit shadow-gray-700 shadow-md">
				<span className="self-center text-xl text-primary font-semibold">Register Employee</span>

				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="first_name" label="First Name" labelClassname="bg-secondary rounded-3xl" inputClassname="text-primary border-primary" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="last_name" label="Last Name" labelClassname="bg-secondary rounded-3xl" inputClassname="text-primary border-primary" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="user_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="user_name" label="Username" labelClassname="bg-secondary rounded-3xl" inputClassname="text-primary border-primary" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} type="password" id="password" label="Password" labelClassname="bg-secondary rounded-3xl" inputClassname="text-primary border-primary" />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-[30%] self-center bg-primary text-primary-foreground">
					{repRegisterMutation.isPending ? <Spinner size="small" /> : "Submit"}
				</Button>

				<FormDescription className="text-center ">
					Already have an account?{" "}
					<a onClick={showLogin} className="text-input-foreground font-semibold cursor-pointer">
						Login
					</a>
				</FormDescription>
			</form>
		</Form>
	);
}
