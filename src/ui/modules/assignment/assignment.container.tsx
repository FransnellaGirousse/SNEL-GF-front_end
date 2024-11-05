"use client";

import { AssignmentView } from "@/ui/modules/assignment/assignment.view";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignmentFormFieldsType } from "@/types/forms";

export const AssignmentContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AssignmentFormFieldsType>();

  const onSubmit: SubmitHandler<AssignmentFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    const {
      mission_title,
      introduction,
      mission_objectives,
      planned_activities,
      necessary_resources,
      conclusion,
    } = formData;

    try {
      const response = await fetch("http://localhost:8000/api/create-tdr", {
        method: "POST",
        body: JSON.stringify({
          mission_title,
          introduction,
          mission_objectives,
          planned_activities,
          necessary_resources,
          conclusion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      const data = await response.json();
      console.log(data); 
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <AssignmentView
        form={{ handleSubmit, errors, register, onSubmit, isLoading }}
      />
    </>
  );
};
