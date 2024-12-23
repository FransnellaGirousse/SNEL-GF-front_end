import { FormsType } from "@/types/forms";
import { Button } from "@/ui/design-system/button/button";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdOutlineAddTask } from "react-icons/md";

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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-4 ">
      {/* Section Program/Project Manager */}
      <div className="border border-primary-300 p-4 mb-4">
        <Typography
          variant="caption1"
          theme="black"
          tag="h5"
          className="text-center"
        >
          GESTIONNAIRE(S) DE PROGRAMME/PROJET :
        </Typography>

        <Typography variant="body-sm" theme="black" className="mb-4">
          <input
            type="checkbox"
            id="certifyCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-300"
          />
          "J'ai examiné les frais figurant sur ce bon et je certifie qu'ils sont
          corrects et admissibles pour les contrats/programmes indiqués
          ci-dessous."
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

        <Button
          type="button"
          icon={{ icon: MdOutlineAddTask }}
          iconPosition="left"
          onClick={addSignatureRow}
        >
          
          Ajouter une ligne
        </Button>
      </div>
    </div>
  );
};
