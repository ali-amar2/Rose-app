import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

import { Link } from "@/i18n/navigation";

export default function VerifyOtp() {
  return (
    <>
      <div className="w-[25.3rem] mx-auto">
        <main>
          <div className="border-b border-zinc-200 mb-10 dark:border-zinc-600">
            <h2 className="capitalize text-2xl font-semibold text-zinc-800 mb-1 dark:text-zinc-50">
              Enter the OTP Code
            </h2>
            <p className="text-base font-normal text-zinc-800 dark:text-zinc-50 mb-4">
              We have sent a 6-digit code to user@example.com
              <Link href={"#"}>
                <span className="text-blue-700 font-medium capitalize underline ms-1 ">
                  Edit
                </span>
              </Link>
            </p>
          </div>
        </main>

        {/* otp input */}
        <InputOTP maxLength={6}>
          {Array.from({ length: 6 }, (_, i) => i).map((i) => (
            <InputOTPSlot key={i} index={i} className="mx-auto " />
          ))}
        </InputOTP>

        {/* send new code again */}
        <div className="text-right py-2 px-4 mt-6 me-8">
          <Link
            href={"#"}
            className="text-base font-medium text-zinc-800 capitalize dark:text-zinc-50"
          >
            send a new code
          </Link>
        </div>

        {/* Verify otp button  */}
        <div className="py-3 px-4 border-b border-zinc-200 dark:border-zinc-600 ">
          <Button className="w-full my-9 bg-maroon-600 text-white font-medium text-base capitalize dark:bg-softPink-300 dark:text-zinc-800">
            Verify Otp
          </Button>
        </div>

        <p className="text-sm font-medium text-center mt-5 text-zinc-800 dark:text-zinc-50">
          Need help?
          <span className="font-bold text-maroon-700 dark:text-softPink-300">
            Contact-us
          </span>
        </p>
      </div>
    </>
  );
}
