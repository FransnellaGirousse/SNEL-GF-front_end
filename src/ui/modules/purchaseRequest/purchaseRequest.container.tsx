
"use client"

import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {PurchaseRequestFormFieldsType} from "@/types/forms";
import {PurchaseRequestView} from "@/ui/modules/purchaseRequest/purchaseRequest.view";

export const PurchaseRequestContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<PurchaseRequestFormFieldsType>()
    const onSubmit: SubmitHandler<PurchaseRequestFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData", formData)
    }
    return(
        <PurchaseRequestView form={{handleSubmit, errors, register, onSubmit, isLoading}} />
    )
}