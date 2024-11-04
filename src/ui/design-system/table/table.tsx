"use client";

import { Typography } from "@/ui/design-system/typography/typography";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

interface TableColumn {
  title: string;
  key: string;
  width?: string; 
}

interface TableRow {
  id: string;
  data: Record<string, string | number | JSX.Element>;
}

interface Props {
  columns: TableColumn[];
  rows: TableRow[];
  highlightRow?: string; 
}

export const Table = ({ columns, rows, highlightRow }: Props) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width || "auto" }}
                className="px-4 py-2 border-b border-gray-300 text-left"
              >
                <Typography variant="caption2" tag="span" theme="black">
                  {column.title}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={clsx(
                "hover:bg-gray-50 transition-colors",
                highlightRow === row.id ? "bg-primary-light" : ""
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3 border-b border-gray-200"
                >
                  <Typography variant="caption3" tag="span" theme="black">
                    {row.data[column.key]}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
