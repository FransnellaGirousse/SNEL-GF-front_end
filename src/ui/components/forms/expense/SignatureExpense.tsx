import { FormsType } from "@/types/forms";
import { Textarea } from "@/ui/design-system/forms/textarea";
import { Typography } from "@/ui/design-system/typography/typography";

interface Props {
  form: FormsType;
}

export const SignatureExpense = ({ form }: Props) => {
  const { isLoading, register, errors } = form;

  return (
    <div className="p-4 border border-gray-300">
      <div className="mb-4">
        <Typography variant="body-sm" theme="black" className="font-bold">
          FIN-SOP-007-AA-FORM01-AB
        </Typography>
        <Typography variant="body-sm" theme="black">
          Approved: 18 Jan 2013
        </Typography>
      </div>

      <Typography
        variant="body-sm"
        theme="black"
        className="font-bold underline mb-4"
      >
        Compliance Review Signature
      </Typography>

    </div>
  );
};
