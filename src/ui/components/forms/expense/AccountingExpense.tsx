import { FormsType } from "@/types/forms";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import { Textarea } from "@/ui/design-system/forms/textarea";
import { Typography } from "@/ui/design-system/typography/typography";
import { useState } from "react";

interface Props {
  form: FormsType;
}

export const AccountingExpense = ({ form }: Props) => {
  const { isLoading, register, errors } = form;

  // Gestion dynamique des lignes pour les signatures
  const [signatures, setSignatures] = useState([{ id: 1, value: "" }]);

  const addSignatureRow = () => {
    setSignatures([...signatures, { id: signatures.length + 1, value: "" }]);
  };

  const handleSignatureChange = (id: number, value: string) => {
    setSignatures(
      signatures.map((row) => (row.id === id ? { ...row, value } : row))
    );
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-4 ">
      <div className="border border-primary-300 p-4">
        <Typography
          variant="caption1"
          theme="black"
          tag="h5"
          className="text-center"
        >
          COMPTABILITÉ:
        </Typography>
        <Typography variant="body-sm" theme="black" className="mb-4">
          <input
            type="checkbox"
            id="certifyCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-300"
          />
          "Après ce bon, le solde de vos avances en cours est de : "
        </Typography>

        <div className="flex items-center gap-8 w-full">
          {/* Section MGA et Montant */}
          <div className="flex items-center gap-2 w-1/2">
            <Typography variant="body-sm" theme="black">
              MGA
            </Typography>
            <AdvanceInput
              type="number"
              id="outstanding_balance"
              placeholder="Montant"
              isLoading={isLoading}
              register={register}
              errors={errors}
              className="w-full"
            />
          </div>

          {/* Section Reviewed By */}
          <div className="flex flex-col w-1/2">
            <Typography variant="body-sm" theme="black" className="mb-1">
              REVIEWED BY:
            </Typography>
            <AdvanceInput
              type="text"
              id="reviewed_by"
              placeholder="Name"
              isLoading={isLoading}
              register={register}
              errors={errors}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <Typography variant="body-sm" theme="black">
            DATE:
          </Typography>
          <AdvanceInput
            type="date"
            id="review_date"
            placeholder="Date"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};
