import clsx from "clsx";
import { Typography } from "@/ui/design-system/typography/typography";
import { Controller } from "react-hook-form";

interface Props {
  placeholder?: string;
  errors?: any;
  id: string;
  isLoading?: boolean;
  control: any;
  accept?: string;
}

export const InputUpload = ({
  isLoading,
  placeholder = "Choisir un fichier",
  errors,
  id,
  control,
  accept = "image/*", 
}: Props) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id}>Télécharger une photo :</label>
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
            const maxSize = 2 * 1024 * 1024; // 2 Mo
            if (value.size > maxSize) {
              return "Le fichier doit être inférieur à 2 Mo.";
            }
            return true;
          },
        }}
        render={({ field: { onChange } }) => (
          <div>
            <input
              type="file"
              id={id}
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                onChange(file); 
              }}
              className={clsx(
                "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold",
                "file:bg-primary file:text-white hover:file:bg-primary-500",
                isLoading && "cursor-not-allowed",
                errors[id]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-400",
                "w-full p-2 border rounded focus:outline-none focus:ring-2"
              )}
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
