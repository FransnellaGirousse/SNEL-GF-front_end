"use client"

import {LoginView} from "@/ui/modules/authentication/login/login.view";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginFormFieldsType} from "@/types/forms";
import { signIn } from "next-auth/react"
import { redirect } from 'next/navigation'
import {toast} from "react-toastify";

export const LoginContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register,
        reset,
        resetField
    } = useForm<LoginFormFieldsType>()
    const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
        setIsLoading(true)
        const {email, password} = formData
        const result = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        });

        if (result?.error) {
            setIsLoading(false)
            toast.error("Email ou Mot de passe non reconnu !")
            resetField("password")
        } else {
            setIsLoading(false)
            redirect("/dashboard");
            toast.success("Vous êtes maintenant connectés !")
            reset()
        }
    }
    return (
        <>
            <LoginView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}