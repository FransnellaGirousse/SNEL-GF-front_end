import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Textarea } from "@/ui/design-system/forms/textarea";
import { Typography } from "@/ui/design-system/typography/typography";

interface Props {
  form: FormsType;
}

export const IntroductionForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Typography variant="h5" tag="h1" theme="black" className="text-center">
        TERMES DE REFERENCE DE LA MISSION
      </Typography>
      <Input
        isLoading={isLoading}
        placeholder="Titre de la mission"
        type="text"
        register={register}
        errors={errors}
        id="mission_title"
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          id="date_tdr"
          type="date"
          register={register}
          errors={errors}
          required={true}
          isLoading={isLoading}
          defaultValue={today}
        />
        <Input
          isLoading={isLoading}
          placeholder="Missionaire"
          type="text"
          register={register}
          errors={errors}
          id="traveler"
        />
      </div>
      <Textarea
        isLoading={isLoading}
        placeholder="Introduction"
        register={register}
        errors={errors}
        id="introduction"
        required={true}
        minLength={10}
      />
    </>
  );
};
