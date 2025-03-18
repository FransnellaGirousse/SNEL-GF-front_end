"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdReportGmailerrorred } from "react-icons/md";

export const ReportComponents = () => {
  const [missions, setMissions] = useState<
    { id: number; date: string; name_of_missionary: string; status: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Gestion de la pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const missionsPerPage = 10; // Nombre de missions par page

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/mission-report"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des missions");
        }
        const data = await response.json();

        // Trier les missions du plus récent au plus ancien
        const sortedMissions = data.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setMissions(sortedMissions);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Pagination - Calcul des missions à afficher
  const indexOfLastMission = currentPage * missionsPerPage;
  const indexOfFirstMission = indexOfLastMission - missionsPerPage;
  const currentMissions = missions.slice(
    indexOfFirstMission,
    indexOfLastMission
  );

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <Typography variant="h5" theme="black" tag="h5">
        <MdReportGmailerrorred className="inline mr-2" size={48} />
        Rapport de Mission
      </Typography>

      {isLoading ? (
        <p>Chargement des missions...</p>
      ) : missions.length > 0 ? (
        <>
          <table className="table-fixed w-full">
            <thead className="text-left text-gray border-b border-t border-gray-500">
              <tr>
                <th className="py-5">Date</th>
                <th>Nom du missionnaire</th>
                <th>État</th>
                <th>Étape</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
              {currentMissions.map((mission) => (
                <tr key={mission.id}>
                  <td>{mission.date}</td>
                  <td>{mission.name_of_missionary}</td>
                  <td>{mission.status || "En Cours"}</td>
                  <td>Oui</td>
                  <td className="py-3">
                    <Button
                      variant="outline"
                      icon={{ icon: LiaExchangeAltSolid }}
                      iconPosition="left"
                    >
                      Modifier
                    </Button>
                  </td>
                </tr>
              ))}
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
            <span>
              Page {currentPage} /{" "}
              {Math.ceil(missions.length / missionsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  indexOfLastMission < missions.length ? prev + 1 : prev
                )
              }
              disabled={indexOfLastMission >= missions.length}
              className={`px-4 py-2 border rounded ${
                indexOfLastMission >= missions.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              Suivant
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          Aucun rapport de mission trouvé.
        </p>
      )}
    </div>
  );
};
