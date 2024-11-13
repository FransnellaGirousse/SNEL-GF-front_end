import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDeleteForever } from "react-icons/md";
import { Tableau } from "@/ui/design-system/tableau/tableau";

interface Props {
  form: FormsType;
}

export const TableExpense = ({ form }: Props) => {
  const { isLoading, register, errors } = form;

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

  // Données d'exemple, normalement issues du formulaire
  const rows = [
    {
      id: "1",
      data: {
        location: (
          <input
            type="text"
            {...register("rows[0].location")}
            placeholder="Ex: Bureau"
          />
        ),
        per_diem_rate: (
          <input
            type="number"
            {...register("rows[0].per_diem_rate")}
            placeholder="Ex: 100"
          />
        ),
        percentage_of_advance_required: (
          <input
            type="number"
            {...register("rows[0].percentage_of_advance_required")}
            placeholder="Ex: 50%"
          />
        ),
        number_of_days: (
          <input
            type="number"
            {...register("rows[0].number_of_days")}
            placeholder="Ex: 3"
          />
        ),
        total_amount: <span>Calculé</span>,
        actions: (
          <button type="button">
            <MdDeleteForever className="text-red-500" size={20} />
          </button>
        ),
      },
    },
    // Ajoutez d'autres lignes de données ici si nécessaire
  ];

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

      <Tableau
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        errorMessage={errors ? "Erreur lors du chargement des données" : ""}
      />
    </div>
  );
};
