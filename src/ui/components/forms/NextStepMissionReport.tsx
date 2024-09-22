import {FormsType} from "@/types/forms";
import {Textarea} from "@/ui/design-system/forms/textarea";

interface Props {
    form: FormsType
}

export const NextStepMissionReport = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Textarea
                isLoading={isLoading}
                placeholder="Prochaines Etapes"
                register={register}
                errors={errors}
                id="next_steps"
            />
        </>
    )
}