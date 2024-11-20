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
      await fetch("http://localhost:8000/api/create-tdr", {
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

    } catch (e) {
      console.error(e);
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
