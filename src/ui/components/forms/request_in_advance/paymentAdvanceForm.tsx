"use client";

import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { useState } from "react";

interface Props {
  form: FormsType;
}

export const PaymentAdvanceForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const [paymentShow, setPayment] = useState<boolean>(false);

  const paymentBank = () => {
    setPayment((p) => !p); 
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button onClick={() => setPayment(false)}>Virement en espèce</button>
      <button onClick={paymentBank}>Virement bancaire</button>

      {/* Montant demandé - Visible in both cases */}
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

      {paymentShow && (
        <div className="col-span-2 grid grid-cols-2 gap-5 mt-5 mb-5">
          {/* Nom du titulaire du compte */}
          <Input
            id="name"
            type="text"
            placeholder="Nom du titulaire du compte"
            register={register}
            errors={errors}
            required={true} 
            isLoading={isLoading}
          />

          {/* Banque */}
          <Input
            id="bank"
            type="text"
            placeholder="Nom de la banque"
            register={register}
            errors={errors}
            required={true} 
            isLoading={isLoading}
          />

          {/* Agence */}
          <Input
            id="branch"
            type="text"
            placeholder="Nom de l'agence"
            register={register}
            errors={errors}
            required={true} 
            isLoading={isLoading}
          />

          {/* Numéro de compte */}
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
