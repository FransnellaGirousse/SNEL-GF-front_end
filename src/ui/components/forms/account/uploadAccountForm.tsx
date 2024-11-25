import { FormsType } from "@/types/forms";
import { InputUpload } from "@/ui/design-system/forms/inputUpload";
import { Typography } from "@/ui/design-system/typography/typography";
import { useState } from "react";


interface Props {
  form: FormsType;
}

export const UploadAccountForm = ({ form }: Props) => {
  const { control, isLoading, errors } = form;
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(
    null
  );

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      setProfilePhotoPreview(URL.createObjectURL(file));
    } else {
      setProfilePhotoPreview(null);
    }
  };

  return (
    <div className="space-y-6">
      <Typography variant="h5" theme="black" tag="h5" className="text-center">
        Ajoutez une photo de profil
      </Typography>

      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="profilePhoto" className="relative cursor-pointer">
          <InputUpload
            control={control}
            id="profilePhoto"
            accept="image/*"
            isLoading={isLoading}
            errors={errors}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] || null;
              handlePhotoChange(file);
            }}
          />
        </label>
      </div>
    </div>
  );
};
