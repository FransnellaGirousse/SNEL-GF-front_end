import { FormsType, RegisterFormFieldsType } from "@/types/forms";
import { Button } from "@/ui/design-system/button/button";
import { GrSave } from "react-icons/gr";
import useStore from "@/store/useStore";
import { Input } from "@/ui/design-system/forms/input";
import { PhoneInputNumber } from "@/ui/design-system/forms/inputPhone";
import { Typography } from "@/ui/design-system/typography/typography";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  form: FormsType;
}
export const AccountForm = ({ form }: Props) => {
  const {
    handleSubmit,
    onSubmit,
    isLoading,
    control,
    setValue,
    watch,
    errors,
    register,
  } = form;
  const today = new Date().toISOString().split("T")[0];
  const { user, setUser } = useStore();
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
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
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
              defaultValue={user.firstname}
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
              defaultValue={user.lastname}
            />
          </div>
        </>
        <>
          <div className="grid grid-cols-2 gap-5 mb-5 items-center">
            <PhoneInputNumber
              control={control}
              placeholder="Votre numéro de télephone"
              id="phone_number"
              isLoading={isLoading}
              errors={errors}
              defaultValue={user.phone_number ? user.phone_number : ""}
            />
          </div>
          {errors["role"] && (
            <Typography variant="caption4" tag="div" theme="danger">
              {errors["role"]?.message}
            </Typography>
          )}
        </>
        {!user.role && (
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
              <input
                type="hidden"
                {...register("gestionType")}
                value={gestionType}
              />
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
        )}
        <Button
          isLoading={isLoading}
          type="submit"
          icon={{ icon: GrSave }}
          iconPosition="left"
        >
          Enregistrer
        </Button>
      </form>
    </>
  );
};
