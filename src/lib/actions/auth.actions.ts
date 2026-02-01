"use server";

export async function verifyOtpAction() {
  //simulating static payload for testing verify otp api
  //incase code dosn't work please change the code value below
  const staticPayload = {
    resetCode: "313539",
  };

  const apiUrl = process.env.API || "https://flower.elevateegy.com/api/v1";

  const response = await fetch(`${apiUrl}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staticPayload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  return payload;
}
