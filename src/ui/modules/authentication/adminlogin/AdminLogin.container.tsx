"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdminLoginFormFieldsType } from "@/types/forms";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AdminLoginView } from "./AdminLogin.view";

export const AdminLoginContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

    try {
      const result = await signIn("admin-credentials", {
        redirect: false, 
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error("Email ou mot de passe incorrect !");
      }

      toast.success("Connexion Admin réussie !");
      reset();
      router.push("/admin");
    } catch (error: any) {
      toast.error(error.message);
      resetField("password");
    } finally {
      setIsLoading(false);
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
