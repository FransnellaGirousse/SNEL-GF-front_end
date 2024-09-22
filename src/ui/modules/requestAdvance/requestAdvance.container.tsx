"use client"

import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {requestAdvanceFormFieldsType} from "@/types/forms";
import {RequestAdvanceView} from "@/ui/modules/requestAdvance/requestAdvance.view";

export const RequestAdvanceContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<requestAdvanceFormFieldsType>()
    const onSubmit: SubmitHandler<requestAdvanceFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData", formData)
    }
    return(
        <RequestAdvanceView form={{handleSubmit, errors, register, onSubmit, isLoading}} />
    )
}