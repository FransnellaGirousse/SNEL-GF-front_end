import clsx from "clsx";
import { Typography } from "@/ui/design-system/typography/typography";

interface Column {
  title: string;
  key: string;
}

interface Row {
  id: string;
  data: Record<string, React.ReactNode>; // Chaque cellule de données dans une ligne
}

interface Props {
  columns: Column[]; // Liste des colonnes du tableau
  rows: Row[]; // Liste des lignes du tableau
  isLoading?: boolean; // Indicateur de chargement
  errorMessage?: string; // Message d'erreur facultatif
}

export const Tableau = ({
  columns,
  rows,
  isLoading = false,
  errorMessage,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-3 text-gray-700 border-b border-gray-300"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr
                key={row.id}
                className={clsx(
                  "hover:bg-gray-50",
                  isLoading && "cursor-not-allowed"
                )}
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-3 border-b border-gray-300">
                    {row.data[column.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-4 text-gray-500"
              >
                {isLoading ? "Chargement..." : "Aucune donnée disponible"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Message d'erreur global en dessous du tableau */}
      {errorMessage && (
        <Typography
          variant="caption4"
          tag="div"
          theme="danger"
          className="mt-2 text-center"
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
