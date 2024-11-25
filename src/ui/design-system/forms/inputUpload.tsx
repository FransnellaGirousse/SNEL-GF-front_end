import clsx from "clsx";
import { Typography } from "@/ui/design-system/typography/typography";
import { Controller } from "react-hook-form";
import { MdEdit } from "react-icons/md"; 
import { useState } from "react";

interface Props {
  errors?: any;
  id: string;
  isLoading?: boolean;
  control: any;
  accept?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputUpload = ({
  isLoading,
  errors,
  id,
  control,
  accept = "image/*",
  className,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); 

  return (
    <div className="relative space-y-2">
      <Controller
        name={id}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Vous devez sélectionner un fichier",
          },
          validate: (value: File | null) => {
            if (!value) return "Aucun fichier sélectionné.";
            const maxSize = 2 * 1024 * 1024; 
            if (value.size > maxSize) {
              return "Le fichier doit être inférieur à 10 Mo.";
            }
            return true;
          },
        }}
        render={({ field: { onChange } }) => (
          <div className="relative flex items-center justify-center w-32 h-32">
            {/* Cercle contenant l'image ou l'icône */}
            <div
              className={clsx(
                "w-full h-full rounded-full flex items-center justify-center border border-primary bg-gray-100 overflow-hidden",
                errors[id] && "border-red-500"
              )}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Aperçu de la photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <MdEdit className="text-gray-500 text-2xl" />
              )}
            </div>

            <input
              type="file"
              id={id}
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file)); 
                } else {
                  setPreviewUrl(null); 
                }
                onChange(file); 
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
          </div>
        )}
      />
      {errors[id] && (
        <Typography variant="caption4" tag="div" theme="danger">
          {errors[id]?.message}
        </Typography>
      )}
    </div>
  );
};
