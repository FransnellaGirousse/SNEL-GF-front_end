"use client"

import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {AssignmentOMFormFieldsType} from "@/types/forms";
import {AssignmentOMView} from "@/ui/modules/assignmentOM/assignmentOM.view";

export const AssignmentOMContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<AssignmentOMFormFieldsType>()
    const onSubmit: SubmitHandler<AssignmentOMFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData", formData)
    }
    return (
        <>
            <AssignmentOMView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}