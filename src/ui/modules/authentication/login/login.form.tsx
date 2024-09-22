import {FormsType} from "@/types/forms";
import { LuLogIn } from "react-icons/lu";
import {Input} from "@/ui/design-system/forms/input";
import {Button} from "@/ui/design-system/button/button";
import {Typography} from "@/ui/design-system/typography/typography";
import Link from "next/link";

interface Props {
    form: FormsType
}

export const LoginForm = ({form}: Props) => {
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
                    placeholder="Mot de passe"
                    type="password"
                    register={register}
                    errors={errors}
                    id="password"
                />

                <div className="flex justify-between items-center">
                    <Typography
                        variant="caption4"
                        tag="span"
                        theme="primary"
                    >
                        <Link href="/forget-password">Mot de passe oublié ?</Link>
                    </Typography>
                    <Button
                        isLoading={isLoading}
                        type="submit"
                        icon={{icon: LuLogIn}}
                        iconPosition="left"
                    >
                        Se Connecter
                    </Button>
                </div>

            </form>
        </>
    )
}