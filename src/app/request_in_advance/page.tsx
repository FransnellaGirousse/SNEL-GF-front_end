import {Layout} from "@/ui/components/layout/layout";
import {Container} from "@/ui/components/container/container";
import {RequestAdvanceContainer} from "@/ui/modules/requestAdvance/requestAdvance.container";

export default function RequestInAdvance () {
    return(
        <Layout>
            <Container className="mt-10">
                <div className="flex justify-center">
                    <div className="border-2 border-gray-400 flex-none max-sm:w-full max-lg:w-[600px] w-[800px] rounded p-10 relative">
                        <RequestAdvanceContainer/>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}