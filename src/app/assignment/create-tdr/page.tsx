import {MissionLayout} from "@/ui/components/layout/missionlayout";
import {Layout} from "@/ui/components/layout/layout";
import {Typography} from "@/ui/design-system/typography/typography";
import {AssignmentContainer} from "@/ui/modules/assignment/assignment.container";

export default function CreateTdrAssignement () {
    return(
        <Layout>
            <MissionLayout>
                <Typography
                    variant="h5"
                    tag="h1"
                    theme="white"
                >
                    Création d'une nouvelle mission (TDR)
                </Typography>
                <AssignmentContainer/>
            </MissionLayout>
        </Layout>
    )
}