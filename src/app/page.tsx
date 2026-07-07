import { redirect } from "next/navigation";
import { getAccessToken, getUserRole } from "@/lib/auth";

export default async function Home() {
  const token = await getAccessToken();
  const role = await getUserRole();

  if (!token) {
    redirect("/login");
  }

  redirect(role === "admin" ? "/admin/dashboard" : "/student/dashboard");
}
