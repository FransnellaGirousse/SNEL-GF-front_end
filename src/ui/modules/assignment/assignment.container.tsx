"use client";

import { AssignmentView } from "@/ui/modules/assignment/assignment.view";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignmentFormFieldsType } from "@/types/forms";
import { toast } from "react-toastify";
import useStore from "@/store/useStore";
import CheckCompaniesResponsables from "@/utils/check_companies_responsable";

export const AssignmentContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useStore();
  const [status, setStatus] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<AssignmentFormFieldsType>();

  const Check = async () => {
    try {
      const checked = await CheckCompaniesResponsables(
        user.key_company,
        "administrator"
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
  const user_id = user.id;
  const user_key_company = user.key_company;

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

      console.log("Response Status:", response.status); // Voir le code de statut
      const responseData = await response.json(); // Extraire les données JSON

      console.log("Response Data:", responseData); // Voir ce que contient la réponse JSON

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

  if (status === false) {
    return (
      <p>
        Vous ne pouvez pas créer un TDR car votre entreprise ne dispose pas
        encore un gestionnaire . Veuillez contacter l'administrateur de votre
        entreprise !
      </p>
    );
  }

  if (status === null) {
    return <p>Chargement ....</p>;
  }

  return (
    <>
      <AssignmentView
        form={{ handleSubmit, errors, register, onSubmit, isLoading }}
      />
    </>
  );
};
