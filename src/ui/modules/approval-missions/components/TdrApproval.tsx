"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdAssignment } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Stockage des statistiques des statuts
  const [tdrStats, setTdrStats] = useState({
    enAttente: 0,
    valide: 0,
    rejete: 0,
  });

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

          // Calculer le nombre de TDRs par statut
          const stats = {
            enAttente: data.filter((tdr) => tdr.status === "En attente").length,
            valide: data.filter((tdr) => tdr.status === "Validé").length,
            rejete: data.filter((tdr) => tdr.status === "Rejeté").length,
          };
          setTdrStats(stats);
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
        `http://localhost:8000/api/tdr/update-status/${selectedTdr.id}`, // Route mise à jour
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

      // Mettre à jour la liste des TDRs localement
      setTdrs((prevTdrs) =>
        prevTdrs.map((tdr) =>
          tdr.id === selectedTdr.id
            ? { ...tdr, status: updatedTdr.tdr.status }
            : tdr
        )
      );

      closeModal(); // Fermer la modale après mise à jour
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

  // Pagination - Calcul des utilisateurs à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTdrs = tdrs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <Typography variant="h5" theme="black" tag="h5">
        <MdAssignment className="inline mr-2" size={48} />
        Missions
      </Typography>

      {/* Ajout du graphique des statuts */}
      <div className="mb-5">
        <Typography theme="black">Statistiques des TDR</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              {
                name: "En attente",
                count: tdrStats.enAttente,
                color: "#FFCC00",
              },
              { name: "Validé", count: tdrStats.valide, color: "#28A745" },
              { name: "Rejeté", count: tdrStats.rejete, color: "#DC3545" },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FFCC00" name="En attente" />
            <Bar dataKey="count" fill="#28A745" name="Validé" />
            <Bar dataKey="count" fill="#DC3545" name="Rejeté" />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
                    className={`px-3 py-1 rounded-full text-primary-600 ${
                      tdr.status === "Validé"
                        ? "bg-alert-success"
                        : tdr.status === "Rejeté"
                        ? "bg-alert-warning"
                        : "bg-warning"
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
                onClick={() => handleApproval("Validé")}
                className="bg-green-500  text-black px-4 py-2 rounded"
              >
                Valider
              </button>
              <button
                onClick={() => handleApproval("Rejeté")}
                className="bg-red-500 text-black px-4 py-2 rounded"
              >
                Rejeter
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
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
