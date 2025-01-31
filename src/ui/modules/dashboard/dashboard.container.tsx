import { Container } from "@/ui/components/container/container";
import { DashboardView } from "@/ui/modules/dashboard/dashboard.view";
import { PieChart } from "./components/PieChart";

export const DashboardContainer = async () => {

    return (
      <Container className="mt-10 flex max-lg:block gap-5">
        <aside className="w-[310px] bg-white max-lg:w-full max-lg:mb-10 flex-none">
          {/* Navigation ou autre contenu du panneau latéral */}
          {/* <DashboardChart /> */}
          <PieChart />
        </aside>
        <main className="w-full">
          <DashboardView />
        </main>
      </Container>
    );


 
};
