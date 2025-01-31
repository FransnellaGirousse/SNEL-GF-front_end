"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

// Définition du type Mission
interface Mission {
  id: string;
  introduction: string;
  status: string;
}

const ApprovalMissionsList = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/create-tdr"); // Récupérer toutes les missions
        if (response.ok) {
          const data: Mission[] = await response.json();
          setMissions(data);
        } else {
          setError("Erreur lors de la récupération des missions");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des missions");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  if (loading) return <p>Chargement des missions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des Missions à Approuver</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Introduction</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td>{mission.id}</td>
              <td>{mission.introduction}</td>
              <td>{mission.status}</td>
              <td>
                <Link href={`/approval-missions/${mission.id}`}>
                  <a>Approuver</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalMissionsList;
