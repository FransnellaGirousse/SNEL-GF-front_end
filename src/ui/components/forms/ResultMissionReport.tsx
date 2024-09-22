import {FormsType} from "@/types/forms";
import {Textarea} from "@/ui/design-system/forms/textarea";
import {Input} from "@/ui/design-system/forms/input";

interface Props {
    form: FormsType
}

export const ResultMissionReport = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="Point à améliorer"
                type="text"
                register={register}
                errors={errors}
                id="point_to_improve"
            />
            <Input
                isLoading={isLoading}
                placeholder="Point forts"
                type="text"
                register={register}
                errors={errors}
                id="strong_points"
            />
        </>
    )
}