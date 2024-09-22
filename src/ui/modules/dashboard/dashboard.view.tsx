import {MissionComponents} from "@/ui/modules/dashboard/components/missionComponents";
import {AdvanceComponents} from "@/ui/modules/dashboard/components/advanceComponents";
import {PurchaseComponents} from "@/ui/modules/dashboard/components/purchaseComponents";
import {LiquidationComponents} from "@/ui/modules/dashboard/components/liquidationComponents";
import {ReportComponents} from "@/ui/modules/dashboard/components/reportComponents";

export const DashboardView = () => {
    return(
        <>
            <MissionComponents/>
            <ReportComponents/>
            <AdvanceComponents/>
            <PurchaseComponents/>
            <LiquidationComponents/>
        </>
    )
}