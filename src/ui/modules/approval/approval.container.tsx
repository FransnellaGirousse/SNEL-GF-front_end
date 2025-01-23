import { Container } from "@/ui/components/container/container";
import { ApprovalView } from "./approval.view ";
import { hasPermission, PERMISSIONS } from "@/utils/role";
import { getSession } from "next-auth/react";


export const ApprovalContainer = async () => {
  const session = await getSession(); 

  if (!session?.user?.role) { 
  return (
    <Container className="mt-10 flex max-lg:block gap-5">
      <main className="w-full">
        <ApprovalView />
      </main>
    </Container>
  );
}
 if (!hasPermission(session.user.role, PERMISSIONS.ACCES_APPROVAL)) {
   return <div>Accès refusé</div>;
 }
};
