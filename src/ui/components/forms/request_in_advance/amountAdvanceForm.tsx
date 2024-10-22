"use client";

import { FormsType } from "@/types/forms";
import { Controller, useFieldArray } from "react-hook-form";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import CurrencyInput from "react-currency-input-field";
import { Button } from "@/ui/design-system/button/button";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
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
        const perDiemRate = parseFloat(watch(`rows[${index}].per_diem_rate`) || 0);
        const percentageOfAdvance = parseFloat(watch(`rows[${index}].percentage_of_advance_required`) || 0);
        const numberOfDays = parseFloat(watch(`rows[${index}].number_of_days`) || 0);

        const total =
          (perDiemRate * percentageOfAdvance * numberOfDays) / 100;
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

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2 break-words whitespace-normal">
              Location
            </th>
            <th className="border border-gray-400 p-2 break-words whitespace-normal">
              Taux journalier
            </th>
            <th className="border border-gray-400 p-2 break-words whitespace-normal">
              Pourcentage de l'avance nécessaire
            </th>
            <th className="border border-gray-400 p-2 break-words whitespace-normal">
              Coefficient d'évaluation journalier
            </th>
            <th className="border border-gray-400 p-2 break-words whitespace-normal">
              Total
            </th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => {
            const perDiemRate = parseFloat(
              watch(`rows[${index}].per_diem_rate`) || 0
            );
            const percentageOfAdvance = parseFloat(
              watch(`rows[${index}].percentage_of_advance_required`) || 0
            );
            const numberOfDays = parseFloat(
              watch(`rows[${index}].number_of_days`) || 0
            );

            const total =
              (perDiemRate * percentageOfAdvance * numberOfDays) / 100;

            return (
              <tr key={item.id} className="text-sm md:text-base">
                <td className="border border-gray-400 p-2 break-words whitespace-normal">
                  <AdvanceInput
                    type="text"
                    id={`rows[${index}].location`}
                    placeholder="Date: Location ..."
                    isLoading={isLoading}
                    register={register}
                    errors={errors}
                  />
                </td>
                <td className="border border-gray-400 p-2 w-[200px] break-words whitespace-normal">
                  <Controller
                    name={`rows[${index}].per_diem_rate`}
                    control={control}
                    rules={{
                      required: "Ce champ est requis",
                      min: {
                        value: 0,
                        message: "Ce champ doit être supérieur à 0",
                      },
                    }}
                    render={({ field }) => (
                      <CurrencyInput
                        id={`rows[${index}].per_diem_rate`}
                        decimalScale={2}
                        prefix="Ariary"
                        placeholder="Ariary 100, 000"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        allowNegativeValue={false}
                        className="bg-white outline-0 border border-gray-400 p-2 w-full"
                      />
                    )}
                  />
                </td>
                <td className="border border-gray-400 p-2 w-[100px] break-words whitespace-normal">
                  <Controller
                    name={`rows[${index}].percentage_of_advance_required`}
                    control={control}
                    rules={{
                      required: "Ce champ est requis",
                      min: {
                        value: 0,
                        message: "Percentage must be between 0 and 100",
                      },
                      max: {
                        value: 100,
                        message: "Percentage must be between 0 and 100",
                      },
                      pattern: {
                        value: /^[0-9]*\.?[0-9]{0,2}$/,
                        message: "Invalid percentage format",
                      },
                    }}
                    render={({ field }) => (
                      <CurrencyInput
                        id={`rows[${index}].percentage_of_advance_required`}
                        decimalScale={2}
                        suffix="%"
                        placeholder="10 %"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        allowNegativeValue={false}
                        className="bg-white outline-0 border border-gray-400 p-2 w-full"
                      />
                    )}
                  />
                </td>
                <td className="border border-gray-400 p-2 w-[100px] break-words whitespace-normal">
                  <Controller
                    name={`rows[${index}].number_of_days`}
                    control={control}
                    rules={{
                      required: "Ce champ est requis",
                      min: {
                        value: 0,
                        message:
                          "Le nombre de jours doit être supérieur ou égal à 0",
                      },
                      max: {
                        value: 100,
                        message:
                          "Le nombre de jours doit être inférieur ou égal à 100",
                      },
                      pattern: {
                        value: /^[0-9]*\.?[0-9]{0,2}$/,
                        message: "Format invalide",
                      },
                    }}
                    render={({ field }) => (
                      <CurrencyInput
                        id={`rows[${index}].number_of_days`}
                        decimalScale={2}
                        placeholder="0,75"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        allowNegativeValue={false}
                        className="bg-white outline-0 border border-gray-400 p-2 w-full"
                      />
                    )}
                  />
                </td>
                <td className="border border-gray-400 p-2 w-[200px] break-words whitespace-normal">
                  <CurrencyInput
                    id={`rows[${index}].total_amount`}
                    name={`rows[${index}].total_amount`}
                    value={total}
                    prefix="Ariary"
                    decimalScale={2}
                    disabled={true}
                    className="bg-white outline-0 border border-gray-400 p-2 w-full"
                  />
                </td>
                <td className="border border-gray-400 p-2 w-[100px]">
                  <div className="flex space-x-2">
                    <button type="button" onClick={() => remove(index)}>
                      <MdDeleteForever className="text-red-500" size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right font-bold p-2">
              Total général:
            </td>
            <td className="border border-gray-400 p-2">
              <CurrencyInput
                id="total_sum"
                value={totalSum}
                prefix="Ariary"
                decimalScale={2}
                disabled={true}
                className="bg-white outline-0 border border-gray-400 p-2 w-full font-bold"
              />
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>

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

      <div className="mt-4 p-2 border border-gray-400">
        <label htmlFor="additional_costs" className="font-bold">
          Coûts supplémentaires:
        </label>
        {/* <Input
          id="additional_costs_motif"
          placeholder="Autres motants"
          register={register}
          errors={errors}
          required={true}
          isLoading={isLoading}
        /> */}
        <CurrencyInput
          id="additional_costs"
          value={additionalCosts}
          onValueChange={handleAdditionalCostsChange}
          prefix="Ariary"
          decimalScale={2}
          allowNegativeValue={false}
          className="bg-white outline-0 border border-gray-400 p-2 w-full"
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
          className="bg-white outline-0 border border-gray-400 p-2 w-full"
        />
      </div>
    </div>
  );
};
