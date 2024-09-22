import {FormsType} from "@/types/forms";
import {Textarea} from "@/ui/design-system/forms/textarea";

interface Props {
    form: FormsType
}

export const RecommandationsMissionReport = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Textarea
                isLoading={isLoading}
                placeholder="Recommendations"
                register={register}
                errors={errors}
                id="recommendations"
            />
        </>
    )
}