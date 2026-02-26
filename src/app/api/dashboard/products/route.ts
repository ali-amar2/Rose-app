import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// handles auth token server-side
export async function GET(request: NextRequest) {
  try {
    // get auth token
    const token = await getToken({ req: request });

    // check if token exists
    if (!token?.accesstoken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // fetch data
    const response = await fetch(`${process.env.API}/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accesstoken}`,
      },
    });

    const data = await response.json();

    // check if request was successful
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
    // catch errors
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
