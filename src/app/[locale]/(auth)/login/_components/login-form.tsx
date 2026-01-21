"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, loginValues } from "@/lib/schemas/auth.schema";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import useLogin from "../_hooks/use-login";
import { Loader } from "lucide-react";

export default function LoginForm() {

    // Convert backend error to friendly message
    function getFriendlyErrorMessage(error: string) {
        if (!error) return "Something went wrong";
        if (error.includes("fails to match the required pattern")) {
            return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        }
        return error;
    }

    const form = useForm<loginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const { isPending, mutate: login, isError, error } = useLogin();
    const router = useRouter();

    // Handle form submission
    const onsubmit: SubmitHandler<loginValues> = async (values) => {
        console.log(values)

        login(values, {
            onSuccess: () => {
                router.replace("/");
            }
        })
    };

    return (
        <Form {...form}>
            <form className="flex flex-col w-[25rem]" onSubmit={form.handleSubmit(onsubmit)}>
                <div className="flex flex-col gap-4">

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="user@example.com" error={!!form.formState.errors.email} />
                                </FormControl>
                                <FormMessage className="text-[0.9rem]" />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="********" error={!!form.formState.errors.password} />
                                    </FormControl>
                                    <FormMessage className="text-[0.9rem]" />
                                </FormItem>
                            )}
                        />

                        {/* TODO: Link forgot password */}
                        {/* Forgot password link */}
                        <div className='flex justify-end'>
                            <Link href={""} className='text-maroon-700 font-medium mt-2'>Forgot your password?</Link>
                        </div>
                    </div>
                </div>

                {/* Backend error */}
                {isError && <p className="text-center text-red-600 mt-3">{getFriendlyErrorMessage(error.message)}</p>}

                {/* Remember me */}
                <Label className="flex items-center gap-2 cursor-pointer my-5 mb-8">
                    <Checkbox className="border-maroon-700 data-[state=checked]:bg-maroon-600" />
                    <span className="text-zinc-700">Remember me</span>
                </Label>

                {/* Submit button with loader */}
                <Button disabled={isPending} type="submit" className="">
                    {isPending ? (<Loader className="animate-spin mr-2" size={16} />) : "Login"}
                </Button>

            </form>
        </Form>
    )
}
