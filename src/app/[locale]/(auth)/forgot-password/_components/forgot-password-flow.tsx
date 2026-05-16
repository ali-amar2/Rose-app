"use client";

import { useState } from "react";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { ForgotPasswordSteps } from "@/lib/types/auth";
import EmailStep from "./email-step";
import VerifyOtp from "./verify-otp-step";
import NewPasswordStep from "./new-password-step";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<ForgotPasswordSteps>(
    FORGOT_PASSWORD_STEPS.EMAIL
  );

  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center w-full">
      {step === FORGOT_PASSWORD_STEPS.EMAIL && (
        <EmailStep setStep={setStep} setEmail={setEmail} />
      )}

      {step === FORGOT_PASSWORD_STEPS.OTP && (
        <VerifyOtp email={email} setStep={setStep} />
      )}

      {step === FORGOT_PASSWORD_STEPS.NEW_PASSWORD && (
        <NewPasswordStep email={email} />
      )}
    </div>
  );
}
