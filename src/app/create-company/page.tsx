"use client";

import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import { Button } from "@/ui/design-system/button/button";
import { Input } from "@/ui/design-system/forms/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTable } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";
import { BsFiletypePdf } from "react-icons/bs";

function generateRandomKey(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [key, setKey] = useState(0);
  const [name_company, setNameCompany] = useState("");
  const [data, setData] = useState([]);
  const columns = React.useMemo(
    () => [
      { Header: "Rôle", accessor: "role" },
      { Header: "Clé", accessor: "key" },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data.length ? data : [] });
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Entreprise ${name_company} : Clé (${key}) `, 14, 10);

    const tableColumn = columns.map((col) => col.Header);
    const tableRows = rows.map((row) => {
      prepareRow(row);
      return row.cells.map((cell) => cell.value);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("clé_inscription_entreprise.pdf");
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const onSubmit: SubmitHandler = async (formData) => {
    setIsLoading(true);
    const { company_name, company_description } = formData;
    try {
      await fetch("http://localhost:8000/api/companies", {
        method: "POST",
        body: JSON.stringify({
          name: company_name,
          description: company_description,
          key: generateRandomKey(16),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success(data.message);
          setKey(data.data.key);
          setNameCompany(data.data.name);
          const tabs = Object.entries(data.data.role_keys).map(
            ([role, key]) => ({
              role,
              key,
            })
          );
          setData(tabs);
          setIsLoading(false);
        });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Layout>
      <div className="p-10">
        <Container>
          <div className="border border-gray-500 p-10 rounded">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pt-8 pb-5 space-y-4"
            >
              <Input
                isLoading={isLoading}
                placeholder="Nom de l'entreprise"
                type="text"
                register={register}
                errors={errors}
                id="company_name"
              />
              <Input
                isLoading={isLoading}
                placeholder="Description"
                type="text"
                register={register}
                errors={errors}
                id="company_description"
              />
              <Button isLoading={isLoading} type="submit">
                Créer
              </Button>
            </form>
            {key !== 0 && (
              <div className="w-full flex justify-center items-center p-10">
                <p className="text-xl">Voici votre clé d'entreprise :&nbsp;</p>
                <div className="text-center bg-gray-500 p-5 w-[200px] text-gray">
                  {key}
                </div>
              </div>
            )}
          </div>
          {data.length > 0 && (
            <section>
              <div className="p-4">
                <table
                  {...getTableProps()}
                  className="w-full border border-gray-300"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        className="bg-gray-200"
                      >
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            className="p-2 border border-gray-300"
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className="hover:bg-gray-100"
                        >
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="p-2 border border-gray-300"
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <button
                  onClick={generatePDF}
                  className="text-caption3 text-white px-10 py-4 bg-primary rounded hover:bg-primary-600 transition-all mt-4 flex justify-between items-center gap-2"
                >
                  <BsFiletypePdf className="text-2xl" />
                  Télécharger en PDF
                </button>
              </div>
            </section>
          )}
        </Container>
      </div>
    </Layout>
  );
}
