import { Container } from "@/ui/components/container/container";
import { ApprovaMissionlView } from "./approvalMission.view";

export const ApprovaMissionlContainer = async () => {
  return (
    <Container className="mt-10 flex max-lg:block gap-5">
      <main className="w-full">
      </main>
      <ApprovaMissionlView />
    </Container>
  );
};
