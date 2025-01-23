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
        const {date, object, mission_objectives, mission_location, next_steps, point_to_improve, strong_points, recommendations, progress_of_activities, name_of_missionary} = formData
        try {
            await fetch("http://localhost:8000/api/mission-report", {
              method: "POST",
              body: JSON.stringify({
                date,
                object,
                mission_objectives,
                mission_location,
                next_steps,
                point_to_improve,
                strong_points,
                recommendations,
                progress_of_activities,
                name_of_missionary,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

           
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