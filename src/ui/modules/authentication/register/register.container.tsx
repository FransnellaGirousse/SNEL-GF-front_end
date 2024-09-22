"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterFormFieldsType} from "@/types/forms";
import {RegisterView} from "@/ui/modules/authentication/register/register.view";
import {useState} from "react";

export const RegisterContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register,
        setError,
        reset
    } = useForm<RegisterFormFieldsType>()
    const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log(formData)
    }
    return (
        <RegisterView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
    )
}