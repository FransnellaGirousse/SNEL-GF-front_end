import { Container } from "@/ui/components/container/container";
import { ApprovalAdvanceView } from "./ApprovalAdvanceView";

export const ApprovalAdvanceContainer = async () => {
  return (
    <Container className="mt-10 flex max-lg:block gap-5">
      <main className="w-full">
        <ApprovalAdvanceView />
      </main>
    </Container>
  );
};
