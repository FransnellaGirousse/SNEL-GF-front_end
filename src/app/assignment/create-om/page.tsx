import {MissionLayout} from "@/ui/components/layout/missionlayout";
import {Typography} from "@/ui/design-system/typography/typography";
import {Layout} from "@/ui/components/layout/layout";
import {AssignmentOMContainer} from "@/ui/modules/assignmentOM/assignmentOM.container";

export default function CreateOmAssignement () {
    return(
        <Layout>
            <MissionLayout>
                <Typography
                    variant="h5"
                    tag="h1"
                    theme="white"
                >
                    Création d'une nouvelle mission (OM)
                </Typography>
                <AssignmentOMContainer />
            </MissionLayout>
        </Layout>
    )
}