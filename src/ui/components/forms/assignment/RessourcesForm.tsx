import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";

interface Props {
  form: FormsType;
}

export const RessourcesForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Textarea
        isLoading={isLoading}
        placeholder="Ressources necessaires"
        register={register}
        errors={errors}
        id="necessary_resources"
        required={true}
        minLength={10}
      />
    </>
  );
};
