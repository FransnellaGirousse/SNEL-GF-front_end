import {AssignmentForm} from "@/ui/modules/assignment/assignment.form";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const AssignmentView = ({form}: Props) => {
    return (
        <AssignmentForm form={form}/>
    )
}