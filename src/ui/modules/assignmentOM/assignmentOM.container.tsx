"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignmentOMFormFieldsType } from "@/types/forms";
import { AssignmentOMView } from "@/ui/modules/assignmentOM/assignmentOM.view";
import { toast } from "react-toastify";


export const AssignmentOMContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset
  } = useForm<AssignmentOMFormFieldsType>();
  const onSubmit: SubmitHandler<AssignmentOMFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    const {
      traveler,
      date,
      Purpose_of_the_mission,
      date_hour,
      starting_point,
      destination,
      authorization_airfare,
      fund_speedkey,
      price,
      name_of_the_hotel,
      room_rate,
      confirmation_number,
      date_hotel,
      other_details_hotel,
      other_logistical_requirments,
      tdr_id,
    } = formData;
    try {
      const response = await fetch("", {
        method: "POST",
        body: JSON.stringify({
          traveler,
      date,
      Purpose_of_the_mission,
      date_hour,
      starting_point,
      destination,
      authorization_airfare,
      fund_speedkey,
      price,
      name_of_the_hotel,
      room_rate,
      confirmation_number,
      date_hotel,
      other_details_hotel,
      other_logistical_requirments,
      tdr_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
       if (response.ok) {
        toast.success("OM envoyé avec succès !");
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
    }


  return (
    <>
      <AssignmentOMView
        form={{ handleSubmit, errors, register, onSubmit, isLoading, control }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </>
  );
};
