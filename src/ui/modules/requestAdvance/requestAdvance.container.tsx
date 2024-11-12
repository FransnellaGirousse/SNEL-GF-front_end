"use client"

import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {requestAdvanceFormFieldsType} from "@/types/forms";
import {RequestAdvanceView} from "@/ui/modules/requestAdvance/requestAdvance.view";

export const RequestAdvanceContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        control,
        handleSubmit,
        formState: {errors},
        register,
        watch
    } = useForm<requestAdvanceFormFieldsType>()
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
       special_mailing_instruction,
       purpose_of_travel,
       destination,
       location,
       per_diem_rate,
       daily_rating_coefficient,
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
       signature,
     } = formData
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
           signature,
         }),
         headers: {
           "Content-Type": "application/json",
         },
         mode: "no-cors",
       });
     } catch (e) {
       console.error(e);
     }
   };


    return(
        <RequestAdvanceView form={{handleSubmit, errors, control, register, onSubmit, isLoading, watch}} />
    )
}