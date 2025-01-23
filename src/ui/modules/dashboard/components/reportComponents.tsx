"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdReportGmailerrorred } from "react-icons/md";

export const ReportComponents = () => {
  const [missions, setMissions] = useState<
    { date: string; name_of_missionary: string }[]
  >([]);

  useEffect(() => {
    const storedMission = localStorage.getItem("missionReport");
    if (storedMission) {
      const mission = JSON.parse(storedMission);
      setMissions((prevMissions) => [...prevMissions, mission]);
    }
  }, []);

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <Typography variant="h5" theme="black" tag="h5">
          <MdReportGmailerrorred className="inline mr-2" size={48} />
          Rapport de Mission
        </Typography>
      </div>
      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">Date</th>
            <th>Nom du missionnaire</th>
            <th>Etat</th>
            <th>Etape</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          {missions.map((mission, index) => (
            <tr key={index}>
              <td>{mission.date}</td>
              <td>{mission.name_of_missionary}</td>
              <td>En Cours</td>
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
    </div>
  );
};
