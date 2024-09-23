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
        const {informations, date, per_diem_rate, daily_rating_coefficient, percentage_of_advance_required, total_amount, additional_costs, signature} = formData
        try {
            await fetch ("http://localhost:8000/api/purchase-requests", {
                method: "POST",
                body: JSON.stringify({informations, date, per_diem_rate, daily_rating_coefficient, percentage_of_advance_required, total_amount, additional_costs, signature}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
    return(
        <RequestAdvanceView form={{handleSubmit, errors, register, onSubmit, isLoading}} />
    )
}