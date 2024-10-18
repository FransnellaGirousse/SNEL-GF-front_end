import { Container } from "@/ui/components/container/container";
import {HomeView} from "@/ui/modules/home/home.view";

export const HomeContainer = () => {
  return (
    <Container className="mt-10 flex max-lg:block gap-5">
    
      <main className="w-full">
        <HomeView/>
      </main>
    </Container>
  );
};

