import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";

interface Props {
  form: FormsType;
}

export const UploadAccountForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <div>
        <Typography variant="h5" theme="black" tag="h5" className="text-center">
          Demande d'avance
        </Typography>
      </div>
    </>
  );
};
