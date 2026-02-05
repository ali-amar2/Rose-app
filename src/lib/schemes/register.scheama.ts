import z from "zod";

export const RegistrationSchema = (t: any) =>
    z.object({
        firstName: z
            .string()
            .nonempty({ message: t("validation.firstName.required") })
            .regex(/^[a-zA-Z]+$/, t("validation.firstName.pattern"))
            .min(3, t("validation.firstName.min"))
            .max(15, t("validation.firstName.max")),

        lastName: z
            .string()
            .nonempty({ message: t("validation.lastName.required") })
            .regex(/^[a-zA-Z]+$/, t("validation.lastName.pattern"))
            .min(3, t("validation.lastName.min"))
            .max(15, t("validation.lastName.max")),

        email: z
            .string()
            .email(t("validation.email.invalid")),

        phone: z
            .string()
            .regex(/^\+201[0125][0-9]{8}$/, t("validation.phone.pattern"))
            .length(13, t("validation.phone.length")),

        gender: z.enum(["male", "female"] as const,
            { error: t("validation.gender.required") }
        ),

        password: z
            .string()
            .nonempty({ message: t("validation.password.required") })
            .min(8, t("validation.password.min"))
            .regex(/[0-9]/, t("validation.password.number"))
            .regex(/[a-z]/, t("validation.password.lowercase"))
            .regex(/[A-Z]/, t("validation.password.uppercase"))
            .regex(/[#!?@$%^&*-]/, t("validation.password.special")),

        rePassword: z
            .string()
            .nonempty({ message: t("validation.rePassword.required") }),
    })
        .refine((data) => data.password === data.rePassword, {
            path: ["rePassword"],
            message: t("validation.rePassword.mismatch"),
        });

export type RegistrationSchemaType = z.infer<ReturnType<typeof RegistrationSchema>>;