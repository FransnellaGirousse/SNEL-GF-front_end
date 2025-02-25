import { Layout } from "@/ui/components/layout/layout";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminLoginContainer } from "@/ui/modules/authentication/adminlogin/AdminLogin.container";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    
      <AdminLoginContainer />
  );
}
