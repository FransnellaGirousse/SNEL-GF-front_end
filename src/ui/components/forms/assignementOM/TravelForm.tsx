import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Typography } from "@/ui/design-system/typography/typography";


interface Props {
  form: FormsType;
}

export const TravelForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Typography variant="h5" tag="h1" theme="black" className="text-center">
        ORDRE DE MISSION
      </Typography>
      <div className="grid grid-cols-2 gap-2">
        <Input
          isLoading={isLoading}
          placeholder="Missionaire"
          type="text"
          register={register}
          errors={errors}
          id="traveler"
        />
        <Input
          isLoading={isLoading}
          type="date"
          register={register}
          errors={errors}
          id="date"
        />
      </div>
      <Input
        isLoading={isLoading}
        placeholder="Objet de la mission"
        type="text"
        register={register}
        errors={errors}
        id="Purpose_of_the_mission"
      />
    </>
  );
};
