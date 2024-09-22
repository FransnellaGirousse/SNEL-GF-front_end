import {Container} from "@/ui/components/container/container";
import {DashboardView} from "@/ui/modules/dashboard/dashboard.view";

export const DashboardContainer = () => {
    return(
        <Container className="mt-10 flex gap-5">
            <main className="w-full">
                <DashboardView />
            </main>
            <aside className="w-[310px] flex-none">
                dfdfsfs
            </aside>
        </Container>
    )
}