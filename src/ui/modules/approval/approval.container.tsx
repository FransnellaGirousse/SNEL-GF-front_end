import { Container } from "@/ui/components/container/container";
import { ApprovalView } from "./approval.view ";


export const ApprovalContainer = async () => {

  return (
    <Container className="mt-10 flex max-lg:block gap-5">
      <main className="w-full">
        <ApprovalView />
      </main>
    </Container>
  );
};
