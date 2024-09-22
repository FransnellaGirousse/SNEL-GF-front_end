import {FormsType} from "@/types/forms";
import {Button} from "@/ui/design-system/button/button";
import {Input} from "@/ui/design-system/forms/input";
import {Select} from "@/ui/design-system/forms/select";
import { CiSaveUp1 } from "react-icons/ci";

interface Props {
    form: FormsType
}

export const RegisterForm = ({form}: Props) => {
    const {
        handleSubmit,
        errors,
        register,
        onSubmit,
        isLoading
    } = form;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
                <div className="flex gap-2 justify-between">
                    <Input
                        isLoading={isLoading}
                        placeholder="Nom"
                        type="text"
                        register={register}
                        errors={errors}
                        id="firstname"
                    />
                    <Input
                        isLoading={isLoading}
                        placeholder="Prénom"
                        type="text"
                        register={register}
                        errors={errors}
                        id="lastname"
                    />
                </div>
                <div className="flex gap-2 justify-between">
                    <Input
                        isLoading={isLoading}
                        placeholder="youremail@gmail.com"
                        type="email"
                        register={register}
                        errors={errors}
                        id="email"
                    />
                    <Input
                        isLoading={isLoading}
                        placeholder="Télephone"
                        type="text"
                        register={register}
                        errors={errors}
                        id="tel"
                    />
                </div>
                <div className="flex justify-between gap-2">
                    <Input
                        isLoading={isLoading}
                        placeholder="Mot de passe"
                        type="password"
                        register={register}
                        errors={errors}
                        id="password"
                    />
                    <Input
                        isLoading={isLoading}
                        placeholder="Confirmer votre mot de passe"
                        type="password"
                        register={register}
                        errors={errors}
                        id="confirmPassword"
                    />
                </div>
                <Select errors="errors" id="role" label="Rôle" />
                <Button
                    isLoading={isLoading}
                    type="submit"
                    icon={{icon: CiSaveUp1}}
                    iconPosition="left"
                >
                    S'Inscrire
                </Button>
            </form>
        </>
    )
}