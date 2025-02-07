"use client";

import { FormsType } from "@/types/forms";
import { Controller, useFieldArray } from "react-hook-form";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import CurrencyInput from "react-currency-input-field";
import { Button } from "@/ui/design-system/button/button";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { Table } from "@/ui/design-system/table/table";
import { Input } from "@/ui/design-system/forms/input";

interface Props {
  form: FormsType;
}

export const AmountAdvanceForm = ({ form }: Props) => {
  const { control, isLoading, register, errors, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const [totalSum, setTotalSum] = useState(0);
  const [additionalCosts, setAdditionalCosts] = useState(0);

  useEffect(() => {
    const calculateTotalSum = () => {
      const totals = fields.map((_, index) => {
        const perDiemRate = parseFloat(
          watch(`rows[${index}].per_diem_rate`) || 0
        );
        const percentageOfAdvance = parseFloat(
          watch(`rows[${index}].percentage_of_advance_required`) || 0
        );
        const numberOfDays = parseFloat(
          watch(`rows[${index}].number_of_days`)|| 0
        );
        const total = (perDiemRate * percentageOfAdvance * numberOfDays) / 100;
        return isNaN(total) ? 0 : total;
      });
      const sum = totals.reduce((acc, curr) => acc + curr, 0);
      setTotalSum(sum);
    };

    calculateTotalSum();
  }, [fields, watch]);

  const handleAdditionalCostsChange = (value: string | undefined) => {
    const parsedValue = parseFloat(value || "0");
    setAdditionalCosts(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const columns = [
    { title: "Location", key: "location" },
    { title: "Taux journalier", key: "per_diem_rate" },
    {
      title: "Pourcentage de l'avance nécessaire",
      key: "percentage_of_advance_required",
    },
    { title: "Coefficient d'évaluation journalier", key: "number_of_days" },
    { title: "Total", key: "total_amount" },
    { title: "Actions", key: "actions" },
  ];

  const rows = fields.map((item, index) => ({
    id: item.id,
    data: {
      location: (
        <AdvanceInput
          type="text"
          id={`rows[${index}].location`}
          placeholder="Date: Location ..."
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      per_diem_rate: (
        <Controller
          name={`rows[${index}].per_diem_rate`}
          control={control}
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].per_diem_rate`}
              decimalScale={2}
              prefix="Ariary"
              placeholder="Ariary 100, 000"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              allowNegativeValue={false}
              className=" border-gray-400 p-2 "
            />
          )}
        />
      ),
      percentage_of_advance_required: (
        <Controller
          name={`rows[${index}].percentage_of_advance_required`}
          control={control}
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].percentage_of_advance_required`}
              decimalScale={2}
              suffix="%"
              placeholder="10 %"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              allowNegativeValue={false}
              className=" border-gray-400 p-2 "
            />
          )}
        />
      ),
      number_of_days: (
        <Controller
          name={`rows[${index}].number_of_days`}
          control={control}
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].number_of_days`}
              decimalSeparator="."
              decimalScale={2}
              placeholder="0.75"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              allowNegativeValue={false}
              className=" border-gray-400 p-2 "
            />
          )}
        />
      ),
      total_amount: (
        <CurrencyInput
          id={`rows[${index}].total_amount`}
          name={`rows[${index}].total_amount`}
          value={
            (parseFloat(watch(`rows[${index}].per_diem_rate`) || "0") *
              parseFloat(
                watch(`rows[${index}].percentage_of_advance_required`) || "0"
              ) *
              parseFloat(watch(`rows[${index}].number_of_days`) || "0")) /
            100
          }
          prefix="Ariary"
          decimalScale={2}
          disabled={true}
          className=" border-gray-400 p-2 "
        />
      ),
      actions: (
        <button type="button" onClick={() => remove(index)}>
          <MdDeleteForever className="text-red-500" size={20} />
        </button>
      ),
    },
  }));

 rows.push({
   id: "total_general",
   data: {
     location: <strong>Total général:</strong>,
     per_diem_rate: <span></span>, 
     percentage_of_advance_required: <span></span>, 
     number_of_days: <span></span>, 
     total_amount: (
       <CurrencyInput
         id="total_general"
         value={totalSum}
         prefix="Ariary"
         decimalScale={2}
         disabled={true}
         className="  p-2 font-bold"
       />
     ),
     actions: <span></span>, 
   },
 });

  return (
    <div className="overflow-x-auto">
      <Table columns={columns} rows={rows} />

      <Button>
        <button
          type="button"
          onClick={() =>
            append({
              location: "",
              per_diem_rate: "",
              percentage_of_advance_required: "",
              number_of_days: "",
              total_amount: "",
            })
          }
        >
          Ajouter une ligne
        </button>
      </Button>

      <div className=" mt-4 p-2 border border-gray-400">
        <label htmlFor="additional_costs">Coûts supplémentaires:</label>
        <Input
          id="additional_costs"
          type="text"
          placeholder="Coûts supplémentaires"
          register={register}
          errors={errors}
          required={true}
          isLoading={isLoading}
        />
        <CurrencyInput
          id="additional_costs"
          value={additionalCosts}
          onValueChange={handleAdditionalCostsChange}
          prefix="Ariary"
          decimalScale={2}
          allowNegativeValue={false}
          className="  p-2 w-full"
        />
      </div>

      <div className="mt-4 p-2 font-bold">
        <label htmlFor="final_total" className="font-bold">
          Total final (avec coûts supplémentaires):
        </label>
        <CurrencyInput
          id="final_total"
          value={totalSum + additionalCosts}
          prefix="Ariary"
          decimalScale={2}
          disabled={true}
          className=" border-gray-400 p-2 w-full"
        />
      </div>
    </div>
  );
};
