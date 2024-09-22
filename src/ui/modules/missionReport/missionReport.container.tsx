"use client"

import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {MissionReportFormFieldsType} from "@/types/forms";
import {MissionReportView} from "@/ui/modules/missionReport/missionReport.view";

export const MissionReportContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<MissionReportFormFieldsType>()
    const onSubmit: SubmitHandler<MissionReportFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData", formData)
    }
    return (
        <>
            <MissionReportView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}