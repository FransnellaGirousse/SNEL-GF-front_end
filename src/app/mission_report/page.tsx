import {Layout} from "@/ui/components/layout/layout";
import {Container} from "@/ui/components/container/container";
import {MissionReportContainer} from "@/ui/modules/missionReport/missionReport.container";

export default function MissionReport () {
    return(
        <Layout>
            <Container className="mt-10">
                <div className="flex justify-center">
                    <div className="border-2 border-gray-400 flex-none w-[1000px] rounded p-10 relative">
                        <MissionReportContainer/>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}