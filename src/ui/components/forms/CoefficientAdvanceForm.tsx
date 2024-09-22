import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const CoefficientAdvanceForm = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="Coefficient de Notation Quotidienne"
                type="text"
                register={register}
                errors={errors}
                id="daily_rating_coefficient"
            />
            <Input
                isLoading={isLoading}
                placeholder="Pourcentage de l'avance requise"
                type="text"
                register={register}
                errors={errors}
                id="percentage_of_advance_required"
            />
            <Input
                isLoading={isLoading}
                placeholder="Montant Total"
                type="text"
                register={register}
                errors={errors}
                id="total_amount"
            />
        </>
    )
}