"use client";

import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDeleteForever } from "react-icons/md";
import {  useFieldArray } from "react-hook-form";
import { Table } from "@/ui/design-system/table/table";
import { Button } from "@/ui/design-system/button/button";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";

interface Props {
  form: FormsType;
}

export const AmountPurchaseForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const columns = [
    { title: "Date", key: "date_hour" },
    { title: "Quantité", key: "item" },
    { title: "Type d'unité", key: "unit_type" },
    { title: "Destination", key: "destination" },
    { title: "Prix d'unité estimé", key: "estimated_unit_price" },
    { title: "Total estimé", key: "estimated_total" },
    { title: "Notes", key: "notes" },
    { title: "Actions", key: "actions" },
  ];

  const rows = fields.map((item, index) => ({
    id: item.id,
    data: {
      date_hour: (
        <AdvanceInput
          type="date"
          id={`rows[${index}].date_hour`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      item: (
        <AdvanceInput
          type="text"
          placeholder="Quantité"
          id={`rows[${index}].item`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      unit_type: (
        <AdvanceInput
          type="text"
          placeholder="Type d'unité"
          id={`rows[${index}].unit_type`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      destination: (
        <AdvanceInput
          type="text"
          placeholder="Destination"
          id={`rows[${index}].destination`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      estimated_unit_price: (
        <AdvanceInput
          type="text"
          placeholder="Prix d'unité estimé"
          id={`rows[${index}].estimated_unit_price`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      estimated_total: (
        <AdvanceInput
          type="text"
          placeholder="Total estimé"
          id={`rows[${index}].estimated_total`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      notes: (
        <AdvanceInput
          type="text"
          placeholder="Notes"
          id={`rows[${index}].notes`}
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
  }));

  return (
    <div className="p-4">
      <Typography variant="lead" tag="h5" theme="black" className="text-center">
        Details de la demande
      </Typography>

      <Table columns={columns} rows={rows} />

      <Button>
        <button
          type="button"
          onClick={() =>
            append({
              date_hour: "",
              item: "",
              unit_type: "",
              destination: "",
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
