import z from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type loginValues = z.infer<typeof loginSchema>;
