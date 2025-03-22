import { Typography } from "@/ui/design-system/typography/typography";
import { Controller } from "react-hook-form";
import Select from "react-select";
import ReactSelectCountryList from "react-select-country-list";

interface Props {
  control: any;
  errors: any;
  id: string;
}

export const SelectCountry = ({ control, errors, id }: Props) => {
  const countryOptions = ReactSelectCountryList().getData();
  return (
    <div className="space-y-2">
      <Controller
        name={id}
        control={control}
        defaultValue=""
        rules={{ required: "La nationalité est obligatoire" }}
        render={({ field }) => (
          <Select
            {...field}
            options={countryOptions}
            placeholder="Choisir un pays"
            isClearable
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#E5E5E5",
                borderColor: state.isFocused ? "#E5E5E5" : "#E5E5E5",
                hover: "none",
              }),
            }}
            className="p-2.5 w-full font-white rounded focus:outline-none focus:ring-1 bg-gray-500 text-gray"
          />
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
