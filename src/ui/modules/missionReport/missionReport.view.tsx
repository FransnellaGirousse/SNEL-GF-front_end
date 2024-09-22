import {FormsType} from "@/types/forms";
import {MissionReportForm} from "@/ui/modules/missionReport/missionReport.form";

interface Props {
    form: FormsType
}

export const MissionReportView = ({form}: Props) => {
    return(
        <MissionReportForm form={form} />
    )
}