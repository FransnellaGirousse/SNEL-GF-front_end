"use client"; // Nécessaire pour Next.js 14 avec useState

import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import { MdOutlineAddTask, MdDelete } from "react-icons/md";
import { useState } from "react";

interface Props {
  form: FormsType;
}

export const ProgramProjectManagerExpense = ({ form }: Props) => {
  const { isLoading, register, errors } = form;

  const [signatures, setSignatures] = useState([{ id: 1, value: "" }]);

  // Ajouter une nouvelle ligne
  const addSignatureRow = () => {
    setSignatures((prevSignatures) => [
      ...prevSignatures,
      { id: prevSignatures.length + 1, value: "" },
    ]);
  };

  // Modifier une ligne
  const handleSignatureChange = (id: number, value: string) => {
    setSignatures((prevSignatures) =>
      prevSignatures.map((row) => (row.id === id ? { ...row, value } : row))
    );
  };

  // Supprimer une ligne
  const removeSignatureRow = (id: number) => {
    setSignatures((prevSignatures) =>
      prevSignatures.filter((row) => row.id !== id)
    );
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="p-4">
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
          <div key={signature.id} className="flex items-center gap-2 mb-2">
            <AdvanceInput
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
              className="flex-1"
            />

            <button
              type="button"
              onClick={() => removeSignatureRow(signature.id)}
            >
              <MdDelete className="mr-2" />
            </button>
          </div>
        ))}

        {/* Bouton Ajouter une ligne */}
        <button
          type="button"
          onClick={addSignatureRow}
          className="bg-primary-400 text-white px-4 py-2 rounded mt-2 flex items-center"
        >
          <MdOutlineAddTask className="mr-2" /> Ajouter une ligne
        </button>
      </div>
    </div>
  );
};
