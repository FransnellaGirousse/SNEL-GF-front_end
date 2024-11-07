import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";
import { DashboardContainer } from "@/ui/modules/dashboard/dashboard.container";

export default function Home() {
  return (
    <Layout>
            <DashboardContainer />
    </Layout>
  );
}
