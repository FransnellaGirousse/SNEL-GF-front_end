import { FormsType } from "@/types/forms";
import { InputUpload } from "@/ui/design-system/forms/inputUpload";
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
      <div className="space-y-4">
        <InputUpload
          control={control}
          id="profilePhoto"
          placeholder="Téléchargez votre photo de profil"
          errors={errors}
          isLoading={isLoading}
          accept="image/*"
        />
      </div>
        <div>
       <InputUpload
          control={control}
          id="document"
          placeholder="Téléchargez un document"
          errors={errors}
          isLoading={isLoading}
          accept=".pdf,.doc,.docx"
        />
      </div>
    </>
  );
};
