"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdminLoginFormFieldsType } from "@/types/forms";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { AdminLoginView } from "./AdminLogin.view";

export const AdminLoginContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    resetField,
  } = useForm<AdminLoginFormFieldsType>();
  const onSubmit: SubmitHandler<AdminLoginFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    const { email, password } = formData;
    const result = await signIn("credentials", {
      redirect: true,
      email: email,
      password: password,
    });

    if (result?.error) {
      setIsLoading(false);
      toast.error("Email ou Mot de passe non reconnu !");
      resetField("password");
    } else {
      setIsLoading(false);
      redirect("/dashboard");
      reset();
    }
  };
  return (
    <>
      <AdminLoginView
        form={{ handleSubmit, errors, register, onSubmit, isLoading }}
      />
    </>
  );
};
