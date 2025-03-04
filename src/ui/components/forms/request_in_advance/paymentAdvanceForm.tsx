"use client";

import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Typography } from "@/ui/design-system/typography/typography";
import { useState } from "react";

interface Props {
  form: FormsType;
}

export const PaymentAdvanceForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  const [paymentType, setPaymentType] = useState<"cash" | "bank" | null>(null);

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Choix du type de paiement */}
      <div className="col-span-2 flex flex-col gap-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={paymentType === "cash"}
            onChange={() =>
              setPaymentType(paymentType === "cash" ? null : "cash")
            }
            className="w-4 h-4"
          />
          <Typography theme="black" variant="caption2">
            Virement en espèce
          </Typography>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={paymentType === "bank"}
            onChange={() =>
              setPaymentType(paymentType === "bank" ? null : "bank")
            }
            className="w-4 h-4"
          />
          <Typography theme="black" variant="caption2">Virement bancaire</Typography>
        </label>
      </div>

      {/* Boutons de paiement (activés en fonction du choix) */}
      <button
        onClick={() => setPaymentType("cash")}
        disabled={paymentType !== "cash"}
        className={`px-4 py-2 text-white rounded ${
          paymentType === "cash"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Virement en espèce
      </button>

      <button
        onClick={() => setPaymentType("bank")}
        disabled={paymentType !== "bank"}
        className={`px-4 py-2 text-white rounded ${
          paymentType === "bank"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Virement bancaire
      </button>

      {/* Montant demandé - toujours visible */}
      <div className="col-span-2 mt-4">
        <Input
          id="amount_requested"
          type="number"
          placeholder="Montant demandé"
          register={register}
          errors={errors}
          required={true}
          isLoading={isLoading}
        />
      </div>

      {/* Affichage des champs bancaires si virement bancaire sélectionné */}
      {paymentType === "bank" && (
        <div className="col-span-2 grid grid-cols-2 gap-5 mt-5 mb-5">
          <Input
            id="name"
            type="text"
            placeholder="Nom du titulaire du compte"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />

          <Input
            id="bank"
            type="text"
            placeholder="Nom de la banque"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />

          <Input
            id="branch"
            type="text"
            placeholder="Nom de l'agence"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />

          <Input
            id="account_number"
            type="number"
            placeholder="Numéro de compte"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};
