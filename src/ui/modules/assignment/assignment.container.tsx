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
        const {mission_objectives, planned_activities, necessary_resources} = formData
        try {
            await fetch ("http://localhost:8000/api/missions", {
                method: "POST",
                body: JSON.stringify({mission_objectives, planned_activities, necessary_resources}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <AssignmentView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}