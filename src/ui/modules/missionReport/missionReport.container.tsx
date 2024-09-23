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
        const {date, object, mission_location, name_of_missionary, mission_objectives, progress_of_activities, point_to_improve, strong_points, recommendations, next_steps} = formData
        try {
            await fetch ("http://localhost:8000/api/mission-reports", {
                method: "POST",
                body: JSON.stringify({date, object, mission_location, name_of_missionary, mission_objectives, progress_of_activities, point_to_improve, strong_points, recommendations, next_steps}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setIsLoading(false)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <MissionReportView form={{handleSubmit, errors, register, onSubmit, isLoading}}/>
        </>
    )
}