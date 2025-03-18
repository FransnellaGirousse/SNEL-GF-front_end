"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdAssignment } from "react-icons/md";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoCreateOutline } from "react-icons/io5";
import { Layout } from "@/ui/components/layout/layout";
import { MissionLayout } from "@/ui/components/layout/missionlayout";

interface Tdr {
  id: number;
  date_tdr: string;
  traveler: string;
  mission_title: string;
  status: string;
  introduction: string;
  mission_objectives: string;
  planned_activities: string;
  necessary_resources: string;
  conclusion: string;
  om: string; // Statut OM (créé ou non)
}

export default function Assignment() {
  const [tdrs, setTdrs] = useState<Tdr[]>([]);
  const [selectedTdr, setSelectedTdr] = useState<Tdr | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Récupérer les TDRs depuis l'API
  useEffect(() => {
    const fetchTdrs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/create-tdr");
        if (response.ok) {
          let data: Tdr[] = await response.json();

          // Trier du plus récent au plus ancien (basé sur `date_tdr`)
          data = data.sort(
            (a, b) =>
              new Date(b.date_tdr).getTime() - new Date(a.date_tdr).getTime()
          );

          setTdrs(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des TDRs", error);
      }
    };

    fetchTdrs();
  }, []);

  // Fonction pour mettre à jour l'OM en fonction du statut du TDR
  const updateOmStatus = (id: number, status: string) => {
    setTdrs((prevTdrs) =>
      prevTdrs.map((tdr) =>
        tdr.id === id
          ? {
              ...tdr,
              om: status === "Validé" || status === "Rejeté" ? "Oui" : "Non", // Débloquer l'OM
              status: status, // Mise à jour du statut du TDR
            }
          : tdr
      )
    );
  };

  // Fonction appelée lorsqu'on clique pour valider ou rejeter un TDR
  const handleStatusUpdate = (id: number, status: string) => {
    updateOmStatus(id, status); // Mettre à jour l'OM et le statut
  };

  // Pagination - Calcul des utilisateurs à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTdrs = tdrs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <MissionLayout>
        <div>
          <Typography variant="h5" theme="black" tag="h5">
            <MdAssignment className="inline mr-2" size={48} />
            Missions
          </Typography>

          {/* Tableau des TDRs */}
          <table className="table-fixed w-full">
            <thead className="text-left text-gray border-b border-t border-gray-500">
              <tr>
                <th className="py-5">Date de TDR</th>
                <th>Nom du missionnaire</th>
                <th>Statut</th>
                <th>TDR</th>
                <th>OM</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
              {currentTdrs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-5 text-center text-gray-500">
                    Aucun TDR à valider en ce moment
                  </td>
                </tr>
              ) : (
                currentTdrs.map((tdr) => (
                  <tr key={tdr.id}>
                    <td className="py-3">{tdr.date_tdr}</td>
                    <td>{tdr.traveler}</td>
                    <td>{tdr.status}</td>
                    <td>{tdr.status}</td>
                    <td>{tdr.om}</td>
                    <td className="py-3">
                      {tdr.status === "Validé" ? (
                        // Si TDR est validé, montrer l'OM
                        <Button
                          variant="outline"
                          icon={{ icon: LiaExchangeAltSolid }}
                          iconPosition="left"
                          onClick={() => handleStatusUpdate(tdr.id, "Validé")}
                          baseUrl="/assignment/create-om"
                          size="small"
                        >
                          Créer OM
                        </Button>
                      ) : tdr.status === "Rejeté" ? (
                        // Si TDR est rejeté, proposer de modifier ou refaire
                        <>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              icon={{ icon: LiaExchangeAltSolid }}
                              iconPosition="left"
                              onClick={() =>
                                handleStatusUpdate(tdr.id, "Rejeté")
                              }
                              size="small"
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="outline"
                              icon={{ icon: IoCreateOutline }}
                              iconPosition="left"
                              baseUrl="/assignment/create-tdr"
                              size="small"
                            >
                              Refaire
                            </Button>
                          </div>
                        </>
                      ) : (
                        // Si TDR est en attente, juste voir les détails
                        <Button
                          variant="outline"
                          icon={{ icon: LiaExchangeAltSolid }}
                          iconPosition="left"
                          onClick={() => console.log("Voir les détails")}
                          size="small"
                        >
                          Voir Détails
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              Précédent
            </button>
            <span> {currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  indexOfLastItem < tdrs.length ? prev + 1 : prev
                )
              }
              disabled={indexOfLastItem >= tdrs.length}
              className={`px-4 py-2 border rounded ${
                indexOfLastItem >= tdrs.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              Suivant
            </button>
          </div>

          {/* Bouton pour créer une nouvelle mission */}
          <div className="mt-5">
            <Button
              icon={{ icon: IoCreateOutline }}
              iconPosition="left"
              baseUrl="/assignment/create-tdr"
            >
              Créer une nouvelle mission
            </Button>
          </div>
        </div>
      </MissionLayout>
    </Layout>
  );
}
