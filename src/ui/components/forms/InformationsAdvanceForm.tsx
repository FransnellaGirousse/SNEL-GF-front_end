import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const InformationsAdvanceForm = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="Informations de la demande"
                type="text"
                register={register}
                errors={errors}
                id="informations"
            />
            <Input
                isLoading={isLoading}
                type="date"
                register={register}
                errors={errors}
                id="date"
            />
            <Input
                isLoading={isLoading}
                placeholder="Taux de Per Diem"
                type="text"
                register={register}
                errors={errors}
                id="per_diem_rate"
            />
        </>
    )
}