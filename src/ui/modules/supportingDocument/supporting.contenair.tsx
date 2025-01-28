"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestAdvanceFormFieldsType } from "@/types/forms";
import { SupportingView } from "./supporting.view";

export const SupportingContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
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
      location,
      per_diem_rate,
      percentage_of_advance_required,
      daily_rating_coefficient,
      number_of_days,
      total_amount,
      additional_costs_motif,
      additional_costs,
      total_sum,
      amount_requested,
      bank,
      branch,
      name,
      account_number,
      special_mailing_instruction,
      total_general,
      final_total,
    } = formData;
    try {
      await fetch("http://localhost:8000/api/request-in-advances", {
        method: "POST",
        body: JSON.stringify({
          social_security_number,
          nationality,
          address,
          date_requested,
          date_need_by,
          special_mailing_instruction,
          purpose_of_travel,
          destination,
          location,
          per_diem_rate,
          daily_rating_coefficient,
          number_of_days,
          percentage_of_advance_required,
          total_amount,
          additional_costs_motif,
          additional_costs,
          total_sum,
          amount_requested,
          bank,
          branch,
          name,
          account_number,
          total_general,
          final_total,
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
    <SupportingView
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
