import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Typography } from "@/ui/design-system/typography/typography";

interface Props {
  form: FormsType;
}

export const InformationExpense = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <div>
        <div>
          <Typography
            variant="h4"
            theme="black"
            tag="h5"
            className="text-center"
          >
            Dépenses
          </Typography>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <Input
            id="paid"
            type="text"
            placeholder="Payeur"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />

          <Input
            id="employee_number"
            type="text"
            placeholder="Votre numéro"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
        </div>

        <div>
          <Input
            id="purpose_of_travel"
            type="text"
            placeholder="Motif"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};
