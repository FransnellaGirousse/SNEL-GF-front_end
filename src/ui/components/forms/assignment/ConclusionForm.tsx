
import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";


interface Props {
  form: FormsType;
}

export const ConclusionForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
     
      <Textarea
        isLoading={isLoading}
        placeholder="Conclusion"
        register={register}
        errors={errors}
        id="conclusion"
        required={true}
        minLength={10}
      />
    </>
  );
};
