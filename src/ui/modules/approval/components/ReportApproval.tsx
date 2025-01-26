"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdReportGmailerrorred } from "react-icons/md";

export const ReportApproval = () => {
  const [missions, setMissions] = useState<
    {
      date: string;
      name_of_missionary: string;
      approval_status: string;
      comments: string;
    }[]
  >([]);

  useEffect(() => {
    // Récupérer les missions à partir de localStorage ou d'un appel API
    const storedMissions = localStorage.getItem("missionReports");
    if (storedMissions) {
      const missions = JSON.parse(storedMissions);
      setMissions(missions);
    }
    // Si tu souhaites ajouter des missions depuis une API, tu pourrais le faire ici.
  }, []);

  const handleApprove = (index: number) => {
    // Met à jour l'état de la mission à "Approuvé"
    const updatedMissions = [...missions];
    updatedMissions[index].approval_status = "Approuvé";
    setMissions(updatedMissions);

    // Tu peux aussi faire un appel à une API ici pour mettre à jour le statut côté serveur
    // fetch('/api/approveMission', { method: 'POST', body: JSON.stringify(missions[index]) });
  };

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <Typography variant="h5" theme="black" tag="h5">
          <MdReportGmailerrorred className="inline mr-2" size={48} />
          Liste des Rapports de Mission à Approuver
        </Typography>
      </div>

      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">Date de la mission</th>
            <th>Nom du missionnaire</th>
            <th>Etat de l'approbation</th>
            <th>Commentaires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          {missions.map((mission, index) => (
            <tr key={index}>
              <td>{mission.date}</td>
              <td>{mission.name_of_missionary}</td>
              <td>{mission.approval_status}</td>
              <td>{mission.comments}</td>
              <td className="py-3">
                {mission.approval_status !== "Approuvé" && (
                  <Button
                    variant="outline"
                    icon={{ icon: LiaExchangeAltSolid }}
                    iconPosition="left"
                    onClick={() => handleApprove(index)}
                  >
                    Approuver
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
