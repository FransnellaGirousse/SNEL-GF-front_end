"use client";

import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function Page({ params }) {
  const id_type_request = params.id_type_request;
  const [requests, setRequests] = useState(null);

  // Récupère les informations de la demande
  const getRequestById = useCallback(async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/approvaladvance/${id_type_request}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }
      setRequests(data); // Stocker la demande dans l'état
      console.log("Données mission mises à jour");
    } catch (error) {
      console.error("Erreur lors de la récupération de la mission :", error);
    }
  }, [id_type_request]);

  useEffect(() => {
    getRequestById();
  }, [getRequestById]);

  const handleApproval = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/request-in-advance/update-status/${id_type_request}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour du statut de la demande"
        );
      }

      const updatedRequest = await response.json();
      console.log("Statut mis à jour :", updatedRequest);

      // Recharger les données de la mission après modification
      await getRequestById();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container>
        <section className="flex gap-5 h-52 mt-20">
          <div className="w-1/3 p-10 border border-gray-500 rounded h-auto">
            <h2 className="text-caption1 font-bold">
              Actions :{" "}
              {requests && (
                <span
                  className={clsx(
                    "px-3 py-1 rounded-full text-primary-600",
                    requests.status === "validé" && "bg-secondary",
                    requests.status === "rejeté" && "bg-alert-warning",
                    requests.status === "en attente" && "bg-gray-300",
                    requests.status === "envoyé" && "bg-blue-500"
                  )}
                >
                  {requests.status}
                </span>
              )}
            </h2>
            {requests &&
              requests.status !== "validé" &&
              requests.status !== "rejeté" && (
                <div className="mt-5 flex space-y-4 flex-col">
                  <button
                    className="text-caption2 text-secondary hover:text-secondary-600 flex gap-1 hover:underline transition-all"
                    onClick={() => handleApproval("validé")}
                  >
                    <FaArrowUp />
                    Valider
                  </button>
                  <button
                    className="text-caption2 text-alert-danger flex gap-1 hover:underline transition-all"
                    onClick={() => handleApproval("rejeté")}
                  >
                    <FaArrowDown />
                    Rejeter
                  </button>

                  <button
                    className="text-caption2 text-primary-400 flex gap-1 hover:underline transition-all"
                    onClick={() => handleApproval("envoyé")}
                  >
                    <FaArrowRight />
                    Envoyer
                  </button>
                </div>
              )}
          </div>

          <div className="w-2/3">
            {requests ? (
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="text-caption2 font-semibold">
                    Numéro de sécurité sociale :&nbsp;
                  </span>
                  {requests.social_security_number}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Nationalité :&nbsp;
                  </span>
                  {requests.nationality}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Adresse :&nbsp;
                  </span>
                  {requests.address}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Date limite de besoin :&nbsp;
                  </span>
                  {requests.date_need_by}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Date de demande :&nbsp;
                  </span>
                  {requests.date_requested}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Objectif de la mission :&nbsp;
                  </span>
                  {requests.purpose_of_travel}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Destination :&nbsp;
                  </span>
                  {requests.destination}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Motif des coûts supplémentaires :&nbsp;
                  </span>
                  {requests.additional_costs_motif || "N/A"}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Coûts supplémentaires :&nbsp;
                  </span>
                  {requests.additional_costs || "N/A"}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Montant demandé :&nbsp;
                  </span>
                  {requests.amount_requested}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Banque :&nbsp;
                  </span>
                  {requests.bank}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Branche :&nbsp;
                  </span>
                  {requests.branch}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Nom :&nbsp;
                  </span>
                  {requests.name}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Numéro de compte :&nbsp;
                  </span>
                  {requests.account_number}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Total général :&nbsp;
                  </span>
                  {requests.total_general}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Total final :&nbsp;
                  </span>
                  {requests.final_total}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Statut :&nbsp;
                  </span>
                  {requests.status}
                </div>

                {/* Table des lignes (rows) */}
                <div className="mt-5">
                  <h3 className="text-caption2 font-bold">
                    Lignes de la demande :
                  </h3>
                  <table className="table-auto mt-4 w-full border border-gray-300">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Emplacement</th>
                        <th className="px-4 py-2">Taux de per diem</th>
                        <th className="px-4 py-2">
                          Pourcentage d'avance demandé
                        </th>
                        <th className="px-4 py-2">Nombre de jours</th>
                        <th className="px-4 py-2">Montant total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.rows && requests.rows.length > 0 ? (
                        requests.rows.map((row, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 border">{row.location}</td>
                            <td className="px-4 py-2 border">
                              {row.per_diem_rate}
                            </td>
                            <td className="px-4 py-2 border">
                              {row.percentage_of_advance_required}
                            </td>
                            <td className="px-4 py-2 border">
                              {row.number_of_days}
                            </td>
                            <td className="px-4 py-2 border">
                              {row.total_amount}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-4 py-2 border text-center"
                          >
                            Aucune ligne disponible
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>Chargement ...</p>
            )}
          </div>
        </section>
      </Container>
    </Layout>
  );
}
