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
import { useTotalStore } from "@/store/useStore";

interface Props {
  form: FormsType;
}

export const AmountAdvanceForm = ({ form }: Props) => {
  const { control, setValue, isLoading, register, errors, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });
  const hasRows = fields.length > 0;
  const final_total = useTotalStore((state) => state.final_total);
  const updateFinalTotal = useTotalStore((state) => state.updateFinalTotal);

  const total_general = useTotalStore((state) => state.total_general);
  const updateTotalGeneral = useTotalStore((state) => state.updateTotalGeneral);

  const [totalSum, setTotalSum] = useState(0);
  const [additionalCosts, setAdditionalCosts] = useState(0);

  useEffect(() => {
    // Fonction pour recalculer `total_general` en fonction des totaux de chaque ligne
    const calculateTotalGeneral = () => {
      const totals = fields.map((_, index) => {
        const perDiemRate = parseFloat(
          watch(`rows[${index}].per_diem_rate`) || "0"
        );
        const percentageOfAdvance = parseFloat(
          watch(`rows[${index}].percentage_of_advance_required`) || "0"
        );
        const numberOfDays = parseFloat(
          watch(`rows[${index}].number_of_days`) || "0"
        );

        // Calcul du total de chaque ligne
        const totalAmount =
          (perDiemRate * percentageOfAdvance * numberOfDays) / 100;
        return isNaN(totalAmount) ? 0 : totalAmount;
      });

      // Calcul de la somme totale de tous les `total_amount`
      const sum = totals.reduce((acc, curr) => acc + curr, 0);

      // Met à jour `total_general` avec la somme calculée
      updateTotalGeneral(sum);
    };

    // Recalcule `total_general` dès qu'un champ est modifié
    calculateTotalGeneral();
  }, [fields, watch]); // Cette `useEffect` se déclenche chaque fois que `fields` ou `watch` change
  // Recalcule à chaque modification des lignes // Le recalcul se fait à chaque modification dans les champs

  useEffect(() => {
    updateFinalTotal(parseFloat(totalSum) + parseFloat(additionalCosts));
  }, [totalSum, additionalCosts, updateFinalTotal]);

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
        <Controller
          name={`rows[${index}].total_amount`}
          control={control}
          render={({ field }) => {
            // Définir une valeur calculée, mais sans provoquer de re-rendu constant
            const perDiemRate = parseFloat(
              watch(`rows[${index}].per_diem_rate`) || "0"
            );
            const percentageOfAdvance = parseFloat(
              watch(`rows[${index}].percentage_of_advance_required`) || "0"
            );
            const numberOfDays = parseFloat(
              watch(`rows[${index}].number_of_days`) || "0"
            );

            const totalAmount =
              (perDiemRate * percentageOfAdvance * numberOfDays) / 100;
            const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

            // Utiliser useEffect pour mettre à jour `total_amount` uniquement lorsque les autres champs changent
            useEffect(() => {
              field.onChange(validTotalAmount.toString());
            }, [perDiemRate, percentageOfAdvance, numberOfDays]);

            return (
              <div
                id={`rows[${index}].total_amount`}
                className="border-gray-400 p-2"
              >
                {/* Affichage du total_amount calculé */}
                {`Ariary ${validTotalAmount.toFixed(2)}`}
              </div>
            );
          }}
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
      total_amount: `Ariary ${total_general.toFixed(2)}`,
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
          {hasRows ? "Ajouter au total général" : "Ajouter une ligne"}
        </button>
      </Button>

      <div className=" mt-4 p-2 border border-gray-400">
        <label htmlFor="additional_costs_motif">Coûts supplémentaires:</label>
        <Input
          id="additional_costs_motif"
          type="text"
          placeholder="Coûts supplémentaires"
          register={register}
          errors={errors}
          required={true}
          isLoading={isLoading}
        />
        <Controller
          name="additional_costs"
          control={control}
          render={({ field }) => (
            <CurrencyInput
              id="additional_costs"
              value={additionalCosts}
              onValueChange={(value) => {
                const val = value || "0.00";
                setAdditionalCosts(val);
                field.onChange(val); // Maintient la synchro avec react-hook-form
              }}
              prefix="Ariary "
              decimalScale={2}
              allowNegativeValue={false}
              className="p-2 w-full"
            />
          )}
        />
      </div>

      <div className="mt-4 p-2 font-bold">
        <label htmlFor="final_total" className="font-bold">
          Total final (avec coûts supplémentaires):
        </label>
        {final_total}
      </div>
    </div>
  );
};
