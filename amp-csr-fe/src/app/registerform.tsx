import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormDescription, FormField, FormItem } from "../components/shadcn/form";
import { FloatingLabelInput } from "../components/shadcn/floatinglabelinput";
import { Button } from "../components/shadcn/button";
import { validCSREP, registerCredentials, registerCSREP, loginCredentials, loginCSREP } from "@/services/api/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { Spinner } from "../components/shadcn/spinner";
import { useRouter } from "next/navigation";
import { setTokenHeader, setValidRepCookies } from "@/lib/utils";
import { CSREP_CONTEXT } from "@/services/auth/repprovider";

const registerSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	user_name: z.string(),
	password: z.string(),
});

export default function RegisterForm({ showLogin }: { showLogin: () => void }) {
	const { setRep } = useContext(CSREP_CONTEXT);
	const router = useRouter();

	const repRegisterMutation: UseMutationResult<validCSREP, Error, registerCredentials, unknown> = useMutation({
		mutationKey: ["register"],
		mutationFn: registerCSREP,
		onSuccess: (data) => {
			setValidRepCookies(data);
			const { token, ...rep } = data;
			setTokenHeader(token);
			setRep(rep);
			router.push("/recent");
		},
	});

	const repLoginMutation: UseMutationResult<validCSREP, Error, loginCredentials, unknown> = useMutation({
		mutationKey: ["login", 2],
		mutationFn: loginCSREP,
		onSuccess: (data) => {
			setValidRepCookies(data);
			const { token, ...rep } = data;
			setTokenHeader(token);
			setRep(rep);
			router.push("/recent");
		},
	});

	function loginTest() {
		repLoginMutation.mutateAsync({ user_name: "TestAcct", password: "Tester77!" });
	}

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
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-sidebar w-[20%] p-3 rounded-2xl h-fit border-[1px] border-sidebar-border shadow-2xl shadow-background">
				<span className="self-center text-xl text-primary/50 font-semibold">Register Employee</span>

				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="first_name" label="First Name" labelClassname="bg-sidebar rounded-3xl" inputClassname="text-primary border-sidebar-border" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="last_name" label="Last Name" labelClassname="bg-sidebar rounded-3xl" inputClassname="text-primary border-sidebar-border" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="user_name"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} id="user_name" label="Username" labelClassname="bg-sidebar rounded-3xl" inputClassname="text-primary border-sidebar-border" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FloatingLabelInput {...field} type="password" id="password" label="Password" labelClassname="bg-sidebar rounded-3xl" inputClassname="text-primary border-sidebar-border" />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-[30%] self-center bg-sidebar-primary text-primary-foreground">
					{repRegisterMutation.isPending ? <Spinner size="small" /> : "Submit"}
				</Button>

				<FormDescription className="text-center flex flex-col">
					<span>
						Already have an account?{" "}
						<a onClick={showLogin} className="text-sidebar-ring font-semibold cursor-pointer">
							Login
						</a>
					</span>
					<span>
						Or use a{" "}
						<a onClick={loginTest} className="text-sidebar-ring font-semibold cursor-pointer">
							Test Account
						</a>
					</span>
				</FormDescription>
			</form>
		</Form>
	);
}
