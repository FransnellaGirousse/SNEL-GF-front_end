import { FormsType, RegisterFormFieldsType } from "@/types/forms";
import { Button } from "@/ui/design-system/button/button";
import { GrSave } from "react-icons/gr";
import useStore from "@/store/useStore";
import { Input } from "@/ui/design-system/forms/input";
import { PhoneInputNumber } from "@/ui/design-system/forms/inputPhone";
import { Typography } from "@/ui/design-system/typography/typography";
import Select from "react-select";
import { Controller } from "react-hook-form";


interface Props {
  form: FormsType;
}
export const AccountForm = ({ form }: Props) => {
  const { handleSubmit, onSubmit, isLoading, control, errors, register } = form;
  const today = new Date().toISOString().split("T")[0];
  const { user, setUser } = useStore();
  const options = [
    { value: "user", label: "Utilisateur" },
    { value: "administrator", label: "Gestionnaire" },
    { value: "accountant", label: "Comptable" },
    { value: "director", label: "Directeur" },
    { value: "visitor", label: "Visiteur" },
  ];
  const arr: string[] = [];
  options.map((option) => {
    arr.push(option.value);
  });
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
            <div>
              <label htmlFor="role">Rôle :</label>
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: "#E5E5E5",
                        borderColor: state.isFocused ? "#E5E5E5" : "#E5E5E5",
                        hover: "none",
                      }),
                    }}
                    className="p-3 w-full font-white rounded focus:outline-none focus:ring-1 bg-gray-500 text-gray top-1"
                    options={options}
                    value={options.find((c) => c.value === value)}
                    onChange={(val) => onChange(val?.value)}
                    defaultValue={
                      options[
                        options.findIndex((obj) => obj["value"] === user.role)
                      ]
                    }
                  />
                )}
                rules={{
                  required: true,
                  validate: (value: string) => {
                    const verificationValue = arr.includes(value);
                    if (!verificationValue) {
                      return "Veuillez choisir le bon rôle";
                    }
                  },
                }}
              />
            </div>
          </div>
          {errors["role"] && (
            <Typography variant="caption4" tag="div" theme="danger">
              {errors["role"]?.message}
            </Typography>
          )}
        </>
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
