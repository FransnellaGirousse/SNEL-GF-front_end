import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";

interface Props {
  form: FormsType;
}

export const ObjectivesForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Textarea
        isLoading={isLoading}
        placeholder="Objectifs de la mission"
        register={register}
        errors={errors}
        id="mission_objectives"
        required={true}
        minLength={10}
      />
    </>
  );
};
