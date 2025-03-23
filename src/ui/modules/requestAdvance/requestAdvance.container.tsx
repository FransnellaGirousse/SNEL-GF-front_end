"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestAdvanceFormFieldsType } from "@/types/forms";
import { toast } from "react-toastify";
import { RequestAdvanceView } from "@/ui/modules/requestAdvance/requestAdvance.view";
import useStore, { useTotalStore } from "@/store/useStore";
import CheckCompaniesResponsables from "@/utils/check_companies_responsable";

export const RequestAdvanceContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { total_general, final_total } = useTotalStore();
  const { user, setUser } = useStore();
  const [status, setStatus] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
  } = useForm<requestAdvanceFormFieldsType>();
  const Check = async () => {
    try {
      const checked = await CheckCompaniesResponsables(
        user.key_company,
        "accountant"
      );
      if (checked) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    Check();
  }, [user]);
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
      status: "en attente",
      rows,
    };
    console.log(requestData);
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
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };
  if (status === false) {
    return (
      <p>
        Vous ne pouvez pas faire une demande d'avance car votre entreprise ne
        dispose pas encore un comptable . Veuillez contacter l'administrateur de
        votre entreprise !
      </p>
    );
  }
  if (status === null) {
    return <p>Chargement ....</p>;
  }
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
