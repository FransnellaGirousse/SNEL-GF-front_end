"use client";

import { useEffect, useState } from "react";
import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDeleteForever } from "react-icons/md";
import { Controller, useFieldArray } from "react-hook-form";
import { Table } from "@/ui/design-system/table/table";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import { Button } from "@/ui/design-system/button/button";
import CurrencyInput from "react-currency-input-field";

interface Props {
  form: FormsType;
}

export const TableExpense = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  // Utilisation de useState pour gérer chaque ligne indépendamment
  const [rowsData, setRowsData] = useState(
    fields.map(() => ({
      inMGA: "",
      exchangeRate: "",
      totalMGA: "0",
    }))
  );

  // Fonction pour mettre à jour les valeurs d'une ligne spécifique
  const handleValueChange = (index: number, field: string, value: string) => {
    setRowsData((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
              totalMGA: (
                parseFloat(field === "inMGA" ? value : row.inMGA || "0") *
                parseFloat(
                  field === "exchangeRate" ? value : row.exchangeRate || "0"
                )
              ).toFixed(2),
            }
          : row
      )
    );
  };

  const columns = [
    { title: "Date mm/dd", key: "date" },
    { title: "Description", key: "description" },
    { title: "FUND/SPEEDKEY/CODE2/GEO/POT OF FUNDS/SUB", key: "fund_speedkey" },
    { title: "Ref:", key: "ref" },
    { title: "in MGA", key: "inMGA" },
    { title: "Exch. Rate", key: "exchangeRate" },
    { title: "MGA", key: "totalMGA" },
    { title: "Actions", key: "actions" },
  ];

  const rows = fields.map((item, index) => ({
    id: item.id,
    data: {
      date: (
        <AdvanceInput
          type="date"
          id={`rows[${index}].date`}
          placeholder="Date mm/dd"
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      description: (
        <AdvanceInput
          type="text"
          id={`rows[${index}].description`}
          placeholder="Description"
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      fund_speedkey: (
        <AdvanceInput
          type="text"
          id={`rows[${index}].fund_speedkey`}
          placeholder="FUND/SPEEDKEY..."
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      ref: (
        <AdvanceInput
          type="text"
          id={`rows[${index}].ref`}
          placeholder="Ref"
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      inMGA: (
        <Controller
          name={`rows[${index}].inMGA`}
          control={control}
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].inMGA`}
              decimalScale={2}
              placeholder="Montant en MGA"
              value={rowsData[index]?.inMGA || ""}
              onValueChange={(value) =>
                handleValueChange(index, "inMGA", value || "0")
              }
              className="border-gray-400 p-2"
            />
          )}
        />
      ),
      exchangeRate: (
        <Controller
          name={`rows[${index}].exchangeRate`}
          control={control}
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].exchangeRate`}
              decimalScale={2}
              placeholder="Taux de change"
              value={rowsData[index]?.exchangeRate || ""}
              onValueChange={(value) =>
                handleValueChange(index, "exchangeRate", value || "0")
              }
              className="border-gray-400 p-2"
            />
          )}
        />
      ),
      totalMGA: (
        <CurrencyInput
          id={`rows[${index}].totalMGA`}
          decimalScale={2}
          placeholder="Total MGA"
          value={rowsData[index]?.totalMGA || "0"}
          className="border-gray-400 p-2"
          disabled
        />
      ),
      actions: (
        <button
          type="button"
          onClick={() => {
            remove(index);
            setRowsData((prev) => prev.filter((_, i) => i !== index));
          }}
        >
          <MdDeleteForever className="text-red-500" size={20} />
        </button>
      ),
    },
  }));

  return (
    <div className="p-4">
      <Typography
        variant="h5"
        theme="black"
        tag="h5"
        className="text-center mb-4"
      >
        Veuillez remplir le tableau ci-dessous
      </Typography>

      <Table columns={columns} rows={rows} />

      <Button>
        <button
          type="button"
          onClick={() => {
            append({
              date: "",
              description: "",
              fund_speedkey: "",
              ref: "",
              inMGA: "",
              exchangeRate: "",
              totalMGA: "",
            });

            setRowsData((prev) => [
              ...prev,
              { inMGA: "", exchangeRate: "", totalMGA: "0" },
            ]);
          }}
        >
          Ajouter une ligne
        </button>
      </Button>

      <div className="mt-4 p-2 font-bold">
        <label htmlFor="final_total" className="font-bold">
          Total général:
        </label>
        <CurrencyInput
          id="final_total"
          value={rowsData.reduce(
            (sum, row) => sum + parseFloat(row.totalMGA || "0"),
            0
          )}
          decimalScale={2}
          disabled
          className="border-gray-400 p-2 w-full"
        />
      </div>
    </div>
  );
};
