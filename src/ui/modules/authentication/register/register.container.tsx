"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterFormFieldsType} from "@/types/forms";
import {RegisterView} from "@/ui/modules/authentication/register/register.view";
import {useState} from "react";
import { toast } from 'react-toastify';

export const RegisterContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register,
        control,
        setError,
        watch,
        reset
    } = useForm<RegisterFormFieldsType>()
    const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData) => {
        setIsLoading(true)
        const {firstname, lastname, email, phone_number, password, confirmPassword, role} = formData
        try {
            await fetch("http://localhost:8000/api/register", {
              method: "POST",
              body: JSON.stringify({
                firstname,
                lastname,
                email,
                phone_number,
                password,
                confirmPassword,
                role,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success === true) {
                    toast.success(data.message)
                    setIsLoading(false)
                    reset()
                } else {
                    setIsLoading(false)
                    for (let field of Object.keys(data.errors)) {
                        toast.error(
                          data.errors[field][0]
                        );
                        setError(field, {
                          type: "manual",
                          message: data.errors[field][0],
                        });
                    }
                }
              })
              .catch((error) => {
                console.error(error)
              });
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <RegisterView form={{handleSubmit, errors, register, onSubmit, isLoading, control, setError, watch}}/>
        </>
    )
}