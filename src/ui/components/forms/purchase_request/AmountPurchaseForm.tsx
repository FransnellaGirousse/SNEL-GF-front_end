"use client";

import { FormsType } from "@/types/forms";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/ui/design-system/button/button";
import { MdDeleteForever } from "react-icons/md";
import { Table } from "@/ui/design-system/table/table";
import { Input } from "@/ui/design-system/forms/input";

interface Props {
  form: FormsType;
}

export const AmountPurchaseForm = ({ form }: Props) => {
  const { control, isLoading, register, errors, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  // Définition des colonnes pour le tableau
  const columns = [
    { title: "Article", key: "item" },
    { title: "Quantité", key: "quantity" },
    { title: "Type d'unité", key: "unit_type" },
    { title: "Description", key: "description" },
    { title: "Prix d'unité estimé", key: "estimated_unit_price" },
    { title: "Total estimé", key: "estimated_total" },
    { title: "Notes", key: "notes" },
    { title: "Actions", key: "actions" },
  ];

  // Génération des lignes du tableau
  const rows = fields.map((item, index) => {
    const quantity = parseFloat(watch(`rows[${index}].quantity`) || "0");
    const estimatedUnitPrice = parseFloat(
      watch(`rows[${index}].estimated_unit_price`) || "0"
    );
    const estimatedTotal = (quantity * estimatedUnitPrice).toFixed(2);

    return {
      id: item.id,
      data: {
        item: (
          <Input
            type="text"
            id={`rows[${index}].item`}
            placeholder="Article"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        ),
        quantity: (
          <Input
            type="number"
            id={`rows[${index}].quantity`}
            placeholder="Quantité"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        ),
        unit_type: (
          <Input
            type="text"
            id={`rows[${index}].unit_type`}
            placeholder="Type d'unité"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        ),
        description: (
          <Input
            type="text"
            id={`rows[${index}].description`}
            placeholder="Description"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        ),
        estimated_unit_price: (
          <Input
            type="number"
            id={`rows[${index}].estimated_unit_price`}
            placeholder="Prix d'unité estimé"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        ),
        estimated_total: (
          <Input
            type="text"
            id={`rows[${index}].estimated_total`}
            value={estimatedTotal} // Calcul automatique
            placeholder="Total estimé"
            isLoading={isLoading}
            disabled={true} // Non modifiable
          />
        ),
        notes: (
          <Input
            type="text"
            id={`rows[${index}].notes`}
            placeholder="Notes"
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        ),
        actions: (
          <button type="button" onClick={() => remove(index)}>
            <MdDeleteForever className="text-red-500" size={20} />
          </button>
        ),
      },
    };
  });

  return (
    <div className="overflow-x-auto">
      {/* Tableau des articles */}
      <Table columns={columns} rows={rows} />

      {/* Bouton pour ajouter une ligne */}
      <Button>
        <button
          type="button"
          onClick={() =>
            append({
              item: "",
              quantity: "",
              unit_type: "",
              description: "",
              estimated_unit_price: "",
              estimated_total: "",
              notes: "",
            })
          }
        >
          Ajouter une ligne
        </button>
      </Button>
    </div>
  );
};
