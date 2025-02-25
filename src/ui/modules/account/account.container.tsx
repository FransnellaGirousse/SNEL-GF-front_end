"use client";

import { AccountFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountView } from "@/ui/modules/account/account.view";
import { toast } from "react-toastify"; 
import useStore from "@/store/useStore";// Importation de react-toastify
import { useRouter } from "next/navigation";

export const AccountContainer = ({ userId }: { userId: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useStore();
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AccountFormFieldsType>();

  const onSubmit: SubmitHandler<AccountFormFieldsType> = async (formData) => {
    setIsLoading(true);
    const { firstname, lastname, role, phone_number } =
      formData;

    try {
      console.log("Données envoyées : ", formData); // Log des données envoyées

      const response = await fetch(
        `http://localhost:8000/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            role,
            phone_number,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json(); // Récupérer la réponse de l'API
        toast.success("Compte mis à jour avec succès !");
        router.push("/dashboard") 
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Erreur lors de la mise à jour du compte !"
        );
      }
    } catch (e) {
      console.error("Erreur : ", e);
      toast.error("Erreur interne, veuillez réessayer !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountView
      form={{
        handleSubmit,
        errors,
        register,
        onSubmit,
        isLoading,
        control,
      }}
    />
  );
};
