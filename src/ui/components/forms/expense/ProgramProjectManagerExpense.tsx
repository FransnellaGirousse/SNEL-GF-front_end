import { FormsType } from "@/types/forms";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import { Textarea } from "@/ui/design-system/forms/textarea";
import { Typography } from "@/ui/design-system/typography/typography";
import { useState } from "react";

interface Props {
  form: FormsType;
}

export const ProgramProjectManagerExpense = ({ form }: Props) => {
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

  return (
    <div className="p-4 ">
      {/* Section Program/Project Manager */}
      <div className="border border-gray-300 p-4 mb-4">
        <Typography variant="body-sm" theme="black" tag="div">
          PROGRAM/PROJECT MANAGER(S):
        </Typography>
        <Typography variant="body-sm" theme="black" className="mb-4">
          "I have reviewed the charges on this voucher and certify that they are
          correct and allowable for the contracts/programs indicated below."
        </Typography>

        {/* Lignes pour SIGNATURES */}
        {signatures.map((signature) => (
          <AdvanceInput
            key={signature.id}
            type="text"
            id={`signature-row-${signature.id}`}
            value={signature.value}
            placeholder="Signature & Project or Program"
            isLoading={isLoading}
            register={register}
            onChange={(e) =>
              handleSignatureChange(signature.id, e.target.value)
            }
            errors={errors}
          />
        ))}
        <button
          type="button"
          onClick={addSignatureRow}
          className="text-blue-500 mt-2"
        >
          + Add another row
        </button>
      </div>

      {/* Section Accounting */}
      <div className="border border-gray-300 p-4">
        <Typography variant="body-sm" theme="black" tag="div">
          ACCOUNTING:
        </Typography>
        <Typography variant="body-sm" theme="black" className="mb-4">
          "After this voucher, the balance of your outstanding advances is:"
        </Typography>
        <div className="flex items-center mb-4">
          <Typography variant="body-sm" theme="black" className="mr-2">
            MGA
          </Typography>
          <AdvanceInput
            type="number"
            id="outstanding_balance"
            placeholder="Montant"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        </div>
        <div className="mb-2">
          <Typography variant="body-sm" theme="black">
            REVIEWED BY:
          </Typography>
          <AdvanceInput
            type="text"
            id="reviewed_by"
            placeholder="Name"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
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
