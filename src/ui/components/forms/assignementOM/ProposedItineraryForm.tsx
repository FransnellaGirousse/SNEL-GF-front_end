"use client";

import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDeleteForever } from "react-icons/md";
import { Controller, useFieldArray } from "react-hook-form";
import { Table } from "@/ui/design-system/table/table";
import { Button } from "@/ui/design-system/button/button";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";

interface Props {
  form: FormsType;
}

export const ProposedItineraryForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const columns = [
    { title: "Date", key: "date_hour" },
    { title: "Point de départ", key: "starting_point" },
    { title: "Destination", key: "destination" },
    { title: "Autorisation", key: "authorization_airfare" },
    { title: "FUND/SPEEDKEY", key: "fund_speedkey" },
    { title: "Prix", key: "price" },
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
      starting_point: (
        <AdvanceInput
          type="text"
          placeholder="Point de départ"
          id={`rows[${index}].starting_point`}
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
      authorization_airfare: (
        <AdvanceInput
          type="text"
          placeholder="Autorisation"
          id={`rows[${index}]. authorization_airfare`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      fund_speedkey: (
        <AdvanceInput
          type="text"
          placeholder="FUND/SPEEDKEY"
          id={`rows[${index}].fund_speedkey`}
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      ),
      price: (
        <AdvanceInput
          type="text"
          placeholder="Prix"
          id={`rows[${index}].price`}
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
        Itinéraire Proposé
      </Typography>

      <Table columns={columns} rows={rows} />

      <Button>
        <button
          type="button"
          onClick={() =>
            append({
              date_hour: "",
              starting_point: "",
              destination: "",
              other_details_hotel: "",
              fund_speedkey: "",
              price: "",
            })
          }
        >
          Ajouter une ligne
        </button>
      </Button>
    </div>
  );
};
