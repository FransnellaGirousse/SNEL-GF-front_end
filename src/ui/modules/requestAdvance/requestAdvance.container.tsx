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
     try {
       const response = await fetch(
         "http://localhost:8000/api/request-in-advances",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(formData),
         }
       );

       if (!response.ok) {
         throw new Error("Failed to submit the form");
       }

       const data = await response.json();
       console.log("Form submitted successfully", data);
     } catch (error) {
       console.error("Error submitting form:", error);
     } finally {
       setIsLoading(false);
     }
   };


    return(
        <RequestAdvanceView form={{handleSubmit, errors, control, register, onSubmit, isLoading, watch}} />
    )
}