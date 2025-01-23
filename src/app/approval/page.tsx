import { Layout } from "@/ui/components/layout/layout";
import { ApprovalContainer } from "@/ui/modules/approval/approval.container";
import { hasPermission, PERMISSIONS, userRole } from "@/utils/role";


export default function Home() {

  if (!hasPermission(userRole, PERMISSIONS.ACCES_APPROVAL)) {
    return (
      <Layout>
        <ApprovalContainer />
      </Layout>
    );
  }
}
