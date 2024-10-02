import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const NameRegisterForm = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="Nom"
                type="text"
                register={register}
                errors={errors}
                id="firstname"
                minLength={3}
                maxLength={255}
            />
            <Input
                isLoading={isLoading}
                placeholder="Prénom"
                type="text"
                register={register}
                errors={errors}
                id="lastname"
                minLength={3}
                maxLength={255}
            />
        </>
    )
}