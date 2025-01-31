"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignmentOMFormFieldsType } from "@/types/forms";
import { AssignmentOMView } from "@/ui/modules/assignmentOM/assignmentOM.view";

export const AssignmentOMContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<AssignmentOMFormFieldsType>();

  const API_URL = "http://localhost/api/assignment-oms"; // L'URL de ton API Laravel

  // Fonction onSubmit pour envoyer les données à l'API Laravel
  const onSubmit: SubmitHandler<AssignmentOMFormFieldsType> = async (
    formData
  ) => {
    setIsLoading(true);
    setError(null); // Réinitialiser l'erreur à chaque nouvelle soumission
    formData.tdr_id = 5;
    try {
      // Envoi de la requête POST vers l'API Laravel pour créer un nouvel AssignmentOM
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envoi des données du formulaire
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la création de la mission."
        );
      }

      const data = await response.json();
      console.log("Mission créée avec succès", data);

      // Tu peux ajouter une logique pour rediriger ou afficher un message de succès ici
    } catch (err) {
      setError("Une erreur s'est produite lors de l'envoi des données."); // Enregistrer l'erreur pour l'afficher
      console.error(err);
    } finally {
      setIsLoading(false); // Fin de l'état de chargement
    }
  };

  return (
    <>
      <AssignmentOMView
        form={{ handleSubmit, errors, register, onSubmit, isLoading, control }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Afficher un message d'erreur si nécessaire */}
    </>
  );
};
