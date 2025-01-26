"use client";

import { AccountFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountView } from "@/ui/modules/account/account.view";
import { toast } from "react-toastify"; // Importation de react-toastify
import { useSession } from "next-auth/react"; // Importation de useSession

export const AccounContainer = () => {
  const { data: session, status } = useSession(); // Récupération de la session
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AccountFormFieldsType>();

  const onSubmit: SubmitHandler<AccountFormFieldsType> = async (formData) => {
    setIsLoading(true);
    const { firstname, lastname, email, role, phone_number, address } =
      formData;

    // Si le rôle est défini dans la session, on peut l'ajouter ou l'utiliser
    const userRole = session?.role || role; // Priorité au rôle de la session, sinon utilise le rôle du formulaire

    try {
      console.log("Données envoyées : ", formData); // Log des données envoyées

      // Requête API
      const response = await fetch("http://localhost:8000/api/accounts", {
        method: "POST", // Remplacez GET par POST si nécessaire
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          role: userRole, // Utilisation du rôle récupéré depuis la session ou du formulaire
          phone_number,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Vérification de la réponse
      if (response.ok) {
        const data = await response.json(); // Récupérer la réponse de l'API

        // Enregistrer le rôle dans le localStorage
        localStorage.setItem("userRole", data.user.role);
         // Stocke le rôle dans le localStorage

        toast.success("Compte créé avec succès !");
        console.log("Réponse du serveur : ", data.user.role); 
        localStorage.setItem("userRole", data.user.role);// Log de la réponse du serveur
      } else {
        toast.error("Erreur lors de la création du compte !"); // Notification d'erreur
      }
    } catch (e) {
      console.error("Erreur : ", e); // Log des erreurs
      toast.error("Erreur interne, veuillez réessayer !"); // Notification d'erreur générale
    } finally {
      setIsLoading(false); // Arrêter le chargement
    }
  };

  return (
    <>
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
    </>
  );
};
