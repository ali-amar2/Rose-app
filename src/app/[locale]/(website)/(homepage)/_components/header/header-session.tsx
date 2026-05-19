import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Header from ".";

export const dynamic = "force-dynamic";

export default async function HeaderSession() {
  const session = await getServerSession(authOptions);

  return <Header session={session} />;
}
