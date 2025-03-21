"use client";

import { AssignmentView } from "@/ui/modules/assignment/assignment.view";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignmentFormFieldsType } from "@/types/forms";
import { toast } from "react-toastify";
import useStore from "@/store/useStore";

export const AssignmentContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useStore();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AssignmentFormFieldsType>();

  const user_id = user.id;
  const user_key_company = user.key_company;
  console.log(user_key_company);

  const onSubmit: SubmitHandler<AssignmentFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    const {
      date_tdr,
      traveler,
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
          date_tdr,
          traveler,
          mission_title,
          introduction,
          mission_objectives,
          planned_activities,
          necessary_resources,
          conclusion,
          user_id,
          key_company: user_key_company,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("TDR envoyé avec succès !");
        reset();
      } else {
        toast.error("Erreur lors de l'envoi du TDR.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Erreur de connexion. Veuillez réessayer.");
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
