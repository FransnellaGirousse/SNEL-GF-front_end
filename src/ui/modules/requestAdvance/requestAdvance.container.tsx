"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestAdvanceFormFieldsType } from "@/types/forms";
import { toast } from "react-toastify";
import { RequestAdvanceView } from "@/ui/modules/requestAdvance/requestAdvance.view";
import { useTotalStore } from "@/store/useStore";

export const RequestAdvanceContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { total_general, final_total } = useTotalStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
  } = useForm<requestAdvanceFormFieldsType>();
  const onSubmit: SubmitHandler<requestAdvanceFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    const {
      social_security_number,
      nationality,
      address,
      date_requested,
      date_need_by,
      purpose_of_travel,
      destination,
      additional_costs_motif,
      additional_costs,
      amount_requested,
      bank,
      branch,
      name,
      account_number,
      rows,
    } = formData;
    const requestData = {
      social_security_number,
      nationality: nationality.value,
      address,
      date_requested,
      date_need_by,
      purpose_of_travel,
      destination,
      additional_costs_motif,
      additional_costs,
      final_total: final_total.toString(),
      amount_requested,
      bank,
      branch,
      name,
      account_number,
      total_general: total_general.toString(),
      rows,
    };
    console.log("formData", formData);
    console.log("requestData", requestData);
    try {
      await fetch("http://localhost:8000/api/request-in-advances", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success(data.message);
        });
    } catch (e) {
      console.error(e);
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <RequestAdvanceView
      form={{
        handleSubmit,
        errors,
        control,
        register,
        onSubmit,
        isLoading,
        watch,
      }}
    />
  );
};
