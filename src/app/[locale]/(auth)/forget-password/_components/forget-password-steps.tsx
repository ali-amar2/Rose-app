import React from "react";
import EmailStep from "./email-step";
import OTPStep from "./otp-step";
import NewPasswordStep from "./new-password-step";

export default function ForgetPasswordSteps() {
  return (
    <div className="flex items-center justify-center">
      <EmailStep />
      <OTPStep />
      <NewPasswordStep />
    </div>
  );
}
