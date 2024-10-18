import { HomeContainer } from "@/ui/modules/home/home.container";
import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";

export default function Home () {
    return (
        <Layout>
            <Container className="mt-10">
                <div className="flex justify-center">
                    <div className="border-2 border-gray-400 flex-none max-sm:w-full max-lg:w-[600px] w-[1000px] rounded p-10 relative">
                        <HomeContainer/>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}