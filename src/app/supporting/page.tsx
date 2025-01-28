import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";
import SupportingContainer from "@/ui/modules/supporting/supporting.container";

export default function RequestInAdvance() {
  return (
    <Layout>
      <Container className="mt-10">
        <div className="flex justify-center">
          <div className="border-2 border-gray-400 flex-none max-sm:w-full max-lg:w-[600px] w-[1000px] rounded p-10 relative">
            <SupportingContainer/>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
