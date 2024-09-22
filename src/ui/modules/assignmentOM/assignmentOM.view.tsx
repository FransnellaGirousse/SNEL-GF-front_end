import {FormsType} from "@/types/forms";
import {AssignmentOMForm} from "@/ui/modules/assignmentOM/assignmentOM.form";

interface Props {
    form: FormsType
}

export const AssignmentOMView = ({form}: Props) => {
    return (
        <AssignmentOMForm form={form}/>
    )
}