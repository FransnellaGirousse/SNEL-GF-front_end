import { Container } from "@/ui/components/container/container";
import { AdminView } from "./admin.view";

export const AdminContainer = async () => {
  return (
    <Container className="mt-10 flex max-lg:block gap-5">
      <main className="w-full">
        <AdminView />
      </main>
    </Container>
  );
};
