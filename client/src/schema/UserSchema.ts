import { z } from "zod";

export const userSignupSchema = z.object({
  fullName: z.string().min(2, "Enter full Name.."),
  email: z.string().email("Enter a valid Email"),
  password: z.string().min(6, "Password must be atleast of six digits"),
  confirmPassword: z.string(),
  number: z.string().min(10, "Contact number must be atleast of 10 digits")
}).refine(data => data.password === data.confirmPassword, {
  message: "Password and confirm Password does not match",
  path: ['confirmPassword'],
});

export const userLoginSchema = z.object({
  email: z.string().email("Enter a valid Email"),
  password: z.string().min(6, "Password must be atleast of six digits"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
export type SignupInputState = z.infer<typeof userSignupSchema>;