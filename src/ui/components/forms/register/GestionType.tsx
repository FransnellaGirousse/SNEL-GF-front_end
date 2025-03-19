"use client";

import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Typography } from "@/ui/design-system/typography/typography";
import { useEffect, useState } from "react";

interface Props {
  form: FormsType;
}

export const GestionTypeForm = ({ form }: Props) => {
  const { isLoading, register, errors, setValue, watch } = form;
  const gestionType = watch("gestionType") || ""; // 🔥 Suivi en temps réel de `gestionType`

  // Met à jour `gestionType` dans react-hook-form
  useEffect(() => {
    setValue("gestionType", gestionType);
  }, [gestionType, setValue]);
  useEffect(() => {
    if (gestionType === "personnel") {
      setValue("key_company", ""); // Réinitialisation
      setValue("key_role", ""); // Réinitialisation
    }
  }, [gestionType, setValue]);
  return (
    <>
      <div className="grid grid-cols gap-2">
        <div className="col-span-2 flex flex-col gap-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={gestionType === "personnel"}
              onChange={() => setValue("gestionType", "personnel")}
              className="w-4 h-4"
            />
            <Typography theme="black" variant="caption2">
              Gestion personnel
            </Typography>
          </label>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={gestionType === "entreprise"}
              onChange={() => setValue("gestionType", "entreprise")}
              className="w-4 h-4"
            />
            <Typography theme="black" variant="caption2">
              Gestion d'entreprise
            </Typography>
          </label>
        </div>
        <input type="hidden" {...register("gestionType")} value={gestionType} />
      </div>
      {gestionType === "entreprise" && (
        <div className="col-span-2 grid grid-cols-2 gap-5 mt-5 mb-5">
          <Input
            id="key_company"
            type="text"
            placeholder="Clé de l'entreprise"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />

          <Input
            id="key_role"
            type="text"
            placeholder="Clé de votre rôle"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};
