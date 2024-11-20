"use client"
import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { PhoneInputNumber } from "@/ui/design-system/forms/inputPhone";
import { Typography } from "@/ui/design-system/typography/typography";


interface Props {
  form: FormsType;
}

export const InformationAccountForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <div>
        <Typography
          variant="caption1"
          theme="black"
          tag="h5"
          className="text-center"
        >
          Veuillez remplir vos informations ici.
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5 items-center">
        <Input
          isLoading={isLoading}
          placeholder="Nom"
          type="text"
          register={register}
          errors={errors}
          id="firstname"
          minLength={2}
          maxLength={255}
        />
        <Input
          isLoading={isLoading}
          placeholder="Prénom"
          type="text"
          register={register}
          errors={errors}
          id="lastname"
          minLength={2}
          maxLength={255}
        />
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5 items-center">

         <Input
        isLoading={isLoading}
        placeholder="youremail@gmail.com"
        type="email"
        register={register}
        errors={errors}
        id="email"
        pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
        messagePattern="Votre email est invalide"
      />
      <PhoneInputNumber
        control={control}
        placeholder="Votre numéro de télephone"
        id="phone_number"
        isLoading={isLoading}
        errors={errors}
      />

      </div>

     
      <div className="grid grid-cols-2 gap-5 mb-5 items-center">
        <Input
          id="address"
          type="text"
          placeholder="Adresse"
          register={register}
          errors={errors}
          required={true}
          isLoading={isLoading}
        />
        <Typography variant="caption2" tag="p" theme="gray">
          (Exemple: Lot ... Quartier Ville)
        </Typography>
      </div>
    </>
  );
};
