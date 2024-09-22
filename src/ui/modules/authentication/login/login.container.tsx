"use client"

import {LoginView} from "@/ui/modules/authentication/login/login.view";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginFormFieldsType} from "@/types/forms";

export const LoginContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<LoginFormFieldsType>()
    const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData", formData)
    }
    return (
        <>
            <LoginView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}