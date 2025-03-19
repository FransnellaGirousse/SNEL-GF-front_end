"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormFieldsType } from "@/types/forms";
import { RegisterView } from "@/ui/modules/authentication/register/register.view";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react"; // Importation de useSession

export const RegisterContainer = () => {
  const { data: session, status } = useSession(); // Récupérer la session de l'utilisateur
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setError,
    watch,
    reset,
    setValue, // Pour définir la valeur du formulaire
  } = useForm<RegisterFormFieldsType>();

  // Effet pour définir l'email et le rôle dans le formulaire si l'utilisateur est connecté
  useEffect(() => {
    if (session?.user) {
      setValue("email", session.user.email); // Définir l'email récupéré de la session dans le formulaire
      setValue("role", session.user.role || "user"); // Définir le rôle si disponible, sinon rôle par défaut
    }
  }, [session, setValue]); // Mettre à jour lorsque la session change

  const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData) => {
    setIsLoading(true);
    const {
      firstname,
      lastname,
      email,
      phone_number,
      password,
      confirmPassword,
      gestionType,
      key_company,
      key_role,
    } = formData;

    console.log("gestionType", gestionType);

    try {
      await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone_number,
          password,
          confirmPassword,
          gestion_type: gestionType,
          key_company,
          key_role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            toast.success(data.message);
            setIsLoading(false);
            reset();
          } else {
            setIsLoading(false);
            for (let field of Object.keys(data.errors)) {
              toast.error(data.errors[field][0]);
              setError(field, {
                type: "manual",
                message: data.errors[field][0],
              });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <RegisterView
        form={{
          handleSubmit,
          errors,
          register,
          onSubmit,
          isLoading,
          control,
          setError,
          setValue,
          watch,
        }}
      />
    </>
  );
};
