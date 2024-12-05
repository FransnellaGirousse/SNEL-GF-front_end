import { FormsType } from "@/types/forms";
import { Table } from "@/ui/design-system/table/table";
import { AdvanceInput } from "@/ui/design-system/forms/AdvanceInput";
import { Button } from "@/ui/design-system/button/button";
import {  useFieldArray } from "react-hook-form";
import { Typography } from "@/ui/design-system/typography/typography";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  form: FormsType;
}

export const FinanceExpense = ({ form }: Props) => {
const { control, isLoading, register, errors } = form;
const { fields, append, remove } = useFieldArray({
  control,
  name: "rows",
});
 


  const columns = [
    { title: "540003 TRAVEL TEMP DUTY", key: "travelTempDuty" },
    { title: "540004 TRAVEL LOCAL", key: "travelLocal" },
    { title: "551000 FAX, INTERNET TELEPHONE", key: "faxInternetTelephone" },
    { title: "551500 OFFICE SUPPLIES", key: "officeSupplies" },
    { title: "552500 POSTAGE SHIPPING", key: "postageShipping" },
    { title: "552000 PRINTING", key: "printing" },
    { title: "OTHER ACCOUNT", key: "otherAccount" },
    { title: "OTHER AMOUNT", key: "otherAmount" },
    { title: "Actions", key: "actions" },
  ];

   const rows = fields.map((item, index) => ({
     id: item.id,
     data: {
       travelTempDuty: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].travelTempDuty`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       travelLocal: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].travelLocal`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       faxInternetTelephone: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].faxInternetTelephone`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       officeSupplies: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].officeSupplies`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       postageShipping: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].postageShipping`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       printing: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].printing`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       otherAccount: (
         <AdvanceInput
           type="text"
           id={`rows[${index}].otherAccount`}
           placeholder="Compte"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       otherAmount: (
         <AdvanceInput
           type="number"
           id={`rows[${index}].otherAmount`}
           placeholder="Montant"
           isLoading={isLoading}
           register={register}
           errors={errors}
         />
       ),
       actions: (
         <button
           type="button"
           onClick={() => remove(index)}
           className="text-red-500"
         >
           <MdDeleteForever size={20} />
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
        FOR FINANCE OFFICE USE ONLY
      </Typography>

      <Table columns={columns} rows={rows} />
      <Button>
        <button
          type="button"
          onClick={() =>
            append({
              travelTempDuty: "",
              travelLocal: "",
              faxInternetTelephone: "",
              officeSupplies: "",
              postageShipping: "",
              otherAccount: "",
              otherAmount: "",
              actions:"",
            })
          }
        >
          Ajouter une ligne
        </button>
      </Button>
    </div>
  );
};
