"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MissionReportFormFieldsType } from "@/types/forms";
import { MissionReportView } from "@/ui/modules/missionReport/missionReport.view";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useRouter } from "next/navigation"; 


export const MissionReportContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset, 
  } = useForm<MissionReportFormFieldsType>();

  const onSubmit: SubmitHandler<MissionReportFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    const {
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
    } = formData;
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

      localStorage.setItem(
        "missionReport",
        JSON.stringify({ date, name_of_missionary })
      );

      toast.success("Mission envoyée avec succès !");

      reset(); 
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue lors de l'envoi de la mission.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MissionReportView
        form={{ handleSubmit, errors, register, onSubmit, isLoading }}
      />
    </>
  );
};
