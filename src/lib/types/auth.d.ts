import { FORGOT_PASSWORD_STEPS } from "../constants/auth.constant";

export type ForgotPasswordSteps = (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];


