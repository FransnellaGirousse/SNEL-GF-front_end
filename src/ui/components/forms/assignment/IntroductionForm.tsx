import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";
import { Typography } from "@/ui/design-system/typography/typography";

interface Props {
  form: FormsType;
}

export const IntroductionForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Typography variant="h5" tag="h1" theme="black" className="text-center">
        TERMES DE REFERENCE DE LA MISSION
      </Typography>

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
