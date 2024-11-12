import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";

interface Props {
  form: FormsType;
}

export const InformationExpense = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Textarea
        isLoading={isLoading}
        placeholder="Déroulements des activités"
        register={register}
        errors={errors}
        id="progress_of_activities"
        required={true}
        minLength={10}
      />
    </>
  );
};
