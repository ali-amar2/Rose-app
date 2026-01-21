import React from "react";
import EmailStep from "./email-step";
import OTPStep from "./otp-step";
import NewPasswordStep from "./new-password-step";

export default function ForgetPasswordSteps() {
  return (
    <div>
      <EmailStep />
      <OTPStep />
      <NewPasswordStep />
    </div>
  );
}
