import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";

interface Props {
  form: FormsType;
}

export const ActivityForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Textarea
        isLoading={isLoading}
        placeholder="Activités Prévus"
        register={register}
        errors={errors}
        id="planned_activities"
        required={true}
        minLength={10}
      />
    </>
  );
};
