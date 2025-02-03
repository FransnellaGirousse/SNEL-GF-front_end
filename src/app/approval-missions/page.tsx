import { Layout } from "@/ui/components/layout/layout";
import { ApprovaMissionlContainer } from "@/ui/modules/approval-missions/approvalMission.container";
import { ApprovalContainer } from "@/ui/modules/approval/approval.container";

export default function Home() {
  return (
    <Layout>
      <ApprovaMissionlContainer />
    </Layout>
  );
}
