import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const SignatureAdvanceForm = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="Coûts Additionnels"
                type="text"
                register={register}
                errors={errors}
                id="additional_costs"
            />
            <Input
                isLoading={isLoading}
                placeholder="Signature Electronique de l'Employé"
                type="text"
                register={register}
                errors={errors}
                id="signature"
            />
        </>
    )
}