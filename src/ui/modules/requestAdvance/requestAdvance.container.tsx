"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestAdvanceFormFieldsType } from "@/types/forms";
import { toast } from "react-toastify";
import { RequestAdvanceView } from "@/ui/modules/requestAdvance/requestAdvance.view";
import useStore, { useTotalStore } from "@/store/useStore";

export const RequestAdvanceContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { total_general, final_total } = useTotalStore();
  const { user, setUser } = useStore();
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
      missionId,
      rows,
    } = formData;
    console.log("missionId", missionId);
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
      tdr_id: missionId,
      total_general: total_general.toString(),
      user_id: user.id,
      key_company: user.key_company,
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
