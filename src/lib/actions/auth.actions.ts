export async function verifyOtpAction() {
  //simulating static payload for testing purpose
  const staticPayload = {
    resetCode: "311038",
  };

  const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staticPayload),
  });

  const payload = await response.json();

  return payload;
}
