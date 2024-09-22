import {FormsType} from "@/types/forms";
import {RequestAdvanceForm} from "@/ui/modules/requestAdvance/requestAdvance.form";

interface Props {
    form: FormsType
}

export const RequestAdvanceView = ({form}: Props) => {
    return(
        <RequestAdvanceForm form={form} />
    )
}