"use client";

import { FormsType } from "@/types/forms";
import { Controller, useFieldArray } from "react-hook-form";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import CurrencyInput from "react-currency-input-field";
import { Button } from "@/ui/design-system/button/button";

interface Props {
  form: FormsType;
}

export const AmountAdvanceForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Taux journalier</th>
            <th>Pourcentage de l'avance nécessaire</th>
            <th>Coefficient d'évaluation journalier</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td>
                <AdvanceInput
                  type="text"
                  id="location"
                  placeholder="Date: Location ..."
                  isLoading={isLoading}
                  register={register}
                  errors={errors}
                />
              </td>
              <td>
                <Controller
                  name="per_diem_rate"
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
                      id="per_diem_rate"
                      name="per_diem_rate"
                      decimalScale={2}
                      prefix="Ariary"
                      placeholder="Ariary 100, 000"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      allowNegativeValue={false}
                      className="bg-white outline-0 border-b border-gray-500 text-gray p-3"
                    />
                  )}
                />
              </td>
              <td>
                <Controller
                  name="percentage_of_advance_required"
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
                      id="percentage_of_advance_required"
                      name="percentage_of_advance_required"
                      decimalScale={2}
                      prefix=""
                      suffix="%"
                      placeholder="10 %"
                      value={field.value}
                      groupSeparator=""
                      onValueChange={(value) => field.onChange(value)}
                      allowNegativeValue={false}
                      maxLength={5}
                      decimalsLimit={2}
                      className="bg-white outline-0 border-b border-gray-500 text-gray p-3" // Limite le nombre de décimales
                    />
                  )}
                />
              </td>
              <td>
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
                      id={`number_of_days-${index}`}
                      name={`rows[${index}].number_of_days`}
                      decimalScale={2}
                      placeholder="0,75"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      allowNegativeValue={false}
                      className="bg-white outline-0 border-b border-gray-500 text-gray p-3"
                    />
                  )}
                />
              </td>
              <td>
                <Controller
                  name="total_amount"
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
                      id="total_amount"
                      name="total_amount"
                      decimalScale={2}
                      prefix="Ariary"
                      placeholder="Ariary 100, 000"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      allowNegativeValue={false}
                      className="bg-white outline-0 border-b border-gray-500 text-gray p-3"
                    />
                  )}
                />
              </td>
              <td>
                <button type="button" onClick={() => remove(index)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button>
        <button
          type="button"
          onClick={() =>
            append({
              location: "",
              perDiemRate: "",
              numberOfDays: "",
              percentage: "",
              total: "",
            })
          }
        >
          Ajouter une ligne
        </button>
      </Button>
    </>
  );
};
