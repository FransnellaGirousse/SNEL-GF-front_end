"use client"

import {AssignmentView} from "@/ui/modules/assignment/assignment.view";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {AssignmentFormFieldsType} from "@/types/forms";

export const AssignmentContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<AssignmentFormFieldsType>()
    const onSubmit: SubmitHandler<AssignmentFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData", formData)
    }
    return (
        <>
            <AssignmentView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}