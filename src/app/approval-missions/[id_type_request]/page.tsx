"use client";

import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";

export default function Page({ params }) {
  const id_type_request = params.id_type_request;
  const [missions, setMissions] = useState(null);
  const getMissionsById = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/approvalmission/${id_type_request}`,
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
      setMissions(data.mission);
      console.log("Données mission mises à jour");
    } catch (error) {
      console.error("Erreur lors de la récupération de la mission :", error);
    }
  }, [id_type_request]);

  // 2. Appel initial
  useEffect(() => {
    getMissionsById();
  }, [getMissionsById]);

  // 3. handleApproval appelle ensuite getMissionsById
  const handleApproval = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/tdr/update-status/${id_type_request}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut du TDR");
      }

      const updatedTdr = await response.json();
      console.log("Statut mis à jour :", updatedTdr);

      // Rechargement des données de mission après modification
      await getMissionsById();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container>
        <section className="flex gap-5 mt-10">
          <div className="w-1/3 p-10 border border-gray-500 rounded">
            <h2 className="text-caption1 font-bold">
              Actions :{" "}
              {missions && (
                <span
                  className={clsx(
                    "px-3 py-1 rounded-full text-primary-600",
                    missions.status === "Validé" && "bg-secondary",
                    missions.status === "Rejeté" && "bg-alert-warning"
                  )}
                >
                  {missions.status}
                </span>
              )}
            </h2>
            {missions &&
              missions.status !== "Validé" &&
              missions.status !== "Rejeté" && (
                <div className="mt-5 flex space-y-4 flex-col">
                  <button
                    className="text-caption2 text-secondary hover:text-secondary-600 flex gap-1 hover:underline transition-all"
                    onClick={() => handleApproval("Validé")}
                  >
                    <FaArrowUp />
                    Valider
                  </button>
                  <button
                    className="text-caption2 text-alert-danger flex gap-1 hover:underline transition-all"
                    onClick={() => handleApproval("Rejeté")}
                  >
                    <FaArrowDown />
                    Rejeter
                  </button>
                </div>
              )}
          </div>
          <div className="w-2/3">
            {missions ? (
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="text-caption2 font-semibold">
                    Titre de la mission :&nbsp;
                  </span>
                  {missions.mission_title}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Introduction :&nbsp;
                  </span>
                  {missions.introduction}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Objectif de la mission :&nbsp;
                  </span>
                  {missions.mission_objectives}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Activités planifiées :&nbsp;
                  </span>
                  {missions.planned_activities}
                </div>
                <div>
                  <span className="text-caption2 font-semibold">
                    Ressources nécessaires :&nbsp;
                  </span>
                  {missions.necessary_resources}
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
