import { Container } from "@/ui/components/container/container";
import { DashboardView } from "@/ui/modules/dashboard/dashboard.view";
import { getSession } from "next-auth/react";
import { hasPermission, PERMISSIONS } from "@/utils/role";

export const DashboardContainer = async () => {
  const session = await getSession(); // Récupération de la session utilisateur

  if (!session?.user?.role) { 
    return (
    <Container className="mt-10 flex max-lg:block gap-5">
      <aside className="w-[310px] bg-alert-danger max-lg:w-full max-lg:mb-10 flex-none">
        {/* Navigation ou autre contenu du panneau latéral */}
      </aside>
      <main className="w-full">
        <DashboardView />
      </main>
    </Container>
  );
  }

  if (!hasPermission(session.user.role, PERMISSIONS.ACCESS_DASHBOARD)) {
    return <div>Accès refusé</div>;
  }

 
};
