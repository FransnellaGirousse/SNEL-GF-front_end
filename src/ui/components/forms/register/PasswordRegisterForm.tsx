
import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const PasswordRegisterForm = ({form}: Props) => {
    const {isLoading, register, errors, watch} = form
    const pwd = watch("password")
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="Mot de passe"
                type="password"
                register={register}
                errors={errors}
                id="password"
                minLength={8}
                passRegex={[/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/]}
            />
            <Input
                isLoading={isLoading}
                placeholder="Confirmer votre mot de passe"
                type="password"
                register={register}
                errors={errors}
                id="confirmPassword"
                pwd={pwd}
            />
        </>
    )
}