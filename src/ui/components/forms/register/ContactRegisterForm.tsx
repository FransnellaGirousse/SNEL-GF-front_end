"use client"


import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";
import {PhoneInputNumber} from "@/ui/design-system/forms/inputPhone";


interface Props {
    form: FormsType
}

export const ContactRegisterForm = ({form}: Props) => {
    const {isLoading, register, errors, control} = form
    return(
        <>
            <Input
                isLoading={isLoading}
                placeholder="youremail@gmail.com"
                type="email"
                register={register}
                errors={errors}
                id="email"
                pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                messagePattern="Votre email est invalide"
            />
            <PhoneInputNumber
                control={control}
                placeholder="Votre numéro de télephone"
                id="phone_number"
                isLoading={isLoading}
                errors={errors}
            />
        </>
    )
}