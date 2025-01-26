import { AdvanceComponents } from "@/ui/modules/dashboard/components/advanceComponents";
import { PurchaseComponents } from "@/ui/modules/dashboard/components/purchaseComponents";
import { LiquidationComponents } from "@/ui/modules/dashboard/components/liquidationComponents";
import { MissionApproval } from "./components/MissionsApproval";
import { ReportApproval } from "./components/ReportApproval";

export const ApprovalView = () => {
  return (
    <>
      <MissionApproval/>
      <ReportApproval />
      <AdvanceComponents />
      <PurchaseComponents />
      <LiquidationComponents />
    </>
  );
};
