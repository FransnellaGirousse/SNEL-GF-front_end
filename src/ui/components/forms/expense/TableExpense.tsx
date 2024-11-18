
import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDeleteForever } from "react-icons/md";
import { Controller, useFieldArray } from "react-hook-form";
import { Table } from "@/ui/design-system/table/table";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import CurrencyInput from "react-currency-input-field";


interface Props {
  form: FormsType;
}

export const TableExpense = ({ form }: Props) => {

  const { control, isLoading, register, errors } = form;
  const { fields, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const columns = [
    { title: "Date mm/dd", key: "date" },
    { title: "Description", key: "description" },
    { title: "FUND/SPEEDKEY/CODE2/GEO/POT OF FUNDS/SUB", key: "fund_speedkey" },
    { title: "Ref:", key: "ref" },
    { title: "in MGA", key: "inMGA" },
    { title: "Exch. Rate", key: "exchangeRate" },
    { title: "MGA", key: "totalMGA" },
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
          control={form.control} // Utilisation de form.control ici
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].inMGA`}
              decimalScale={2}
              placeholder="Montant en MGA"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              className="border-gray-400 p-2"
            />
          )}
        />
      ),
      exchangeRate: (
        <Controller
          name={`rows[${index}].exchangeRate`}
          control={form.control} // Utilisation de form.control ici
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].exchangeRate`}
              decimalScale={2}
              placeholder="Taux de change"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              className="border-gray-400 p-2"
            />
          )}
        />
      ),
      totalMGA: (
        <Controller
          name={`rows[${index}].totalMGA`}
          control={form.control} // Utilisation de form.control ici
          render={({ field }) => (
            <CurrencyInput
              id={`rows[${index}].totalMGA`}
              decimalScale={2}
              placeholder="Total MGA"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              className="border-gray-400 p-2"
              readOnly
            />
          )}
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
      <Table columns={columns} rows={rows} />
      <Typography
        variant="h5"
        theme="black"
        tag="h5"
        className="text-center mb-4"
      >
        Veuillez remplir le tableau ci-dessous
      </Typography>
    </div>
  );
};
