// "use client"

import { Layout } from "@/ui/components/layout/layout";
import { DashboardContainer } from "@/ui/modules/dashboard/dashboard.container";
// import { hasPermission, PERMISSIONS, userRole } from "@/utils/role";
import { useSession } from "next-auth/react";



export default function Home() {
  // const { data: session } = useSession();
  // console.log(session);
   return (
    <Layout>
            <DashboardContainer />
    </Layout>
  );
  // if (!hasPermission(userRole, PERMISSIONS.ACCESS_DASHBOARD)) {
   
  // }
  
}

