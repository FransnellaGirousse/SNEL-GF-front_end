"use client";

import { AccountFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountView } from "@/ui/modules/account/account.view";

export const AccounContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AccountFormFieldsType>();
  const onSubmit: SubmitHandler<AccountFormFieldsType> = async (formData) => {
    setIsLoading(true);
    console.log("formData", formData);
  };

  return (
    <>
      <AccountView
        form={{ handleSubmit, errors, register, onSubmit, isLoading }}
      />
    </>
  );
};
