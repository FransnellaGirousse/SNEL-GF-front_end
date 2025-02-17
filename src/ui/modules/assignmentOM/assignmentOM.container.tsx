"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignmentOMFormFieldsType } from "@/types/forms";
import { AssignmentOMView } from "@/ui/modules/assignmentOM/assignmentOM.view";

export const AssignmentOMContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<AssignmentOMFormFieldsType>();
  const onSubmit: SubmitHandler<AssignmentOMFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    console.log("formData", formData);
  };

  return (
    <>
      <AssignmentOMView
        form={{ handleSubmit, errors, register, onSubmit, isLoading, control }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Afficher un message d'erreur si nécessaire */}
    </>
  );
};
