// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     const token = await getToken({ req: request });
//     if (!token?.accessToken) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const res = await fetch(`${process.env.API}/wishlist`, {
//       headers: {
//         Authorization: `Bearer ${token.accessToken}`,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(
//         {
//           message: data?.message || "Failed to fetch wishlist",
//         },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json(data?.wishlist?.products ?? [], { status: 200 });
//   } catch (error) {
//     console.error("Wishlist GET error:", error);

//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
