"use client";

import { AccountFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountView } from "@/ui/modules/account/account.view";

export const AccounContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AccountFormFieldsType>();
  const onSubmit: SubmitHandler<AccountFormFieldsType> = async (formData) => {
    setIsLoading(true)
    const {
      firstname,
      lastname,
      email,
      role,
      phone_number,
      profilePhoto,
      address,
    } = formData 
    try {
      await fetch("http://localhost:8000/api/accounts", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          role,
          phone_number,
          profilePhoto,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }  };

  return (
    <>
      <AccountView
        form={{ handleSubmit, errors, register, onSubmit, isLoading, control  }}
      />
    </>
  );
};
