import { Layout } from "@/ui/components/layout/layout";
import { LoginContainer } from "@/ui/modules/authentication/login/login.container";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <Layout>
      <LoginContainer />
    </Layout>
  );
}
