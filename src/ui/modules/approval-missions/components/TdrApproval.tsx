"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdAssignment } from "react-icons/md";

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
}

export const TdrApproval = () => {
  const [tdrs, setTdrs] = useState<Tdr[]>([]);
  const [selectedTdr, setSelectedTdr] = useState<Tdr | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Fonction pour approuver ou rejeter un TDR
  const handleApproval = async (status: string) => {
    if (!selectedTdr) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/create-tdr/${selectedTdr.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du TDR");
      }

      // Mettre à jour le statut localement
      setTdrs((prevTdrs) =>
        prevTdrs.map((tdr) =>
          tdr.id === selectedTdr.id ? { ...tdr, status } : tdr
        )
      );

      closeModal(); // Fermer la modale après l'approbation ou le rejet
    } catch (error) {
      console.error(error);
    }
  };

  // Ouvrir la fenêtre modale avec les détails du TDR
  const openDetailsModal = (tdr: Tdr) => {
    setSelectedTdr(tdr);
    setIsModalOpen(true);
  };

  // Fermer la fenêtre modale
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTdr(null);
  };

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <Typography variant="h5" theme="black" tag="h5">
        <MdAssignment className="inline mr-2" size={48} />
        Missions
      </Typography>

      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">Date de demande</th>
            <th>Nom de l'employé</th>
            <th>TDR</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          {tdrs.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-5 text-center text-gray-500">
                Aucun TDR à valider en ce moment
              </td>
            </tr>
          ) : (
            tdrs.map((tdr) => (
              <tr key={tdr.id}>
                <td>{tdr.date_tdr}</td>
                <td>{tdr.traveler}</td>
                <td>{tdr.mission_title}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      tdr.status === "Approuvé"
                        ? "bg-green-500"
                        : tdr.status === "Rejeté"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {tdr.status}
                  </span>
                </td>
                <td className="py-3 space-x-2">
                  <Button>
                    <button
                      type="button"
                      onClick={() => openDetailsModal(tdr)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Détails
                    </button>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modale pour afficher les détails */}
      {isModalOpen && selectedTdr && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-1/2">
            <Typography variant="h5" theme="black" tag="h5">
              Détails du TDR
            </Typography>
            <div className="space-y-3 mt-4">
              <div>
                <strong>Date de demande:</strong> {selectedTdr.date_tdr}
              </div>
              <div>
                <strong>Nom de l'employé:</strong> {selectedTdr.traveler}
              </div>
              <div>
                <strong>Titre de mission:</strong> {selectedTdr.mission_title}
              </div>
              <div>
                <strong>Introduction:</strong> {selectedTdr.introduction}
              </div>
              <div>
                <strong>Objectifs de la mission:</strong>{" "}
                {selectedTdr.mission_objectives}
              </div>
              <div>
                <strong>Activités planifiées:</strong>{" "}
                {selectedTdr.planned_activities}
              </div>
              <div>
                <strong>Ressources nécessaires:</strong>{" "}
                {selectedTdr.necessary_resources}
              </div>
              <div>
                <strong>Conclusion:</strong> {selectedTdr.conclusion}
              </div>
              <div>
                <strong>Statut:</strong> {selectedTdr.status}
              </div>
            </div>

            <div className="mt-5 flex justify-end space-x-4">
              <button
                onClick={() => handleApproval("Approuvé")}
                className="bg-primary-200 text-white px-4 py-2 rounded"
              >
                Approuver
              </button>
              <button
                onClick={() => handleApproval("Rejeté")}
                className="bg-primary-200 text-white px-4 py-2 rounded"
              >
                Rejeter
              </button>

              <button
                onClick={closeModal}
                className="bg-primary-200 text-white px-4 py-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
