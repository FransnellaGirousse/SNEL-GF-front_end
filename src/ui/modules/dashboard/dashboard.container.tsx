import {Container} from "@/ui/components/container/container";
import {DashboardView} from "@/ui/modules/dashboard/dashboard.view";

export const DashboardContainer = () => {
    return(
        <Container className="mt-10 flex max-lg:block gap-5">
            <aside className="w-[310px] bg-alert-danger max-lg:w-full max-lg:mb-10 flex-none">
                dfdfsfs
            </aside>
            <main className="w-full">
                <DashboardView/>
            </main>
        </Container>
    )
}