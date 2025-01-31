import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Définition du type Mission
interface Mission {
  id: string;
  introduction: string;
  mission_objectives: string;
  planned_activities: string;
  necessary_resources: string;
  conclusion: string;
  status: string;
}

const ApprovalMissions = () => {
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query; // Récupère l'ID de la mission depuis l'URL

  useEffect(() => {
    if (!id) return; // S'assurer que l'ID est disponible avant de faire l'appel à l'API

    const fetchMission = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/create-tdr/${id}`
        );
        if (response.ok) {
          const data: Mission = await response.json();
          setMission(data); // Enregistre les données de la mission dans le state
        } else {
          setError("Mission non trouvée");
        }
      } catch (err) {
        setError("Erreur lors de la récupération de la mission");
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [id]);

  const handleApproval = async () => {
    if (!id) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/create-tdr/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_TOKEN", // Si nécessaire pour l'authentification
          },
          body: JSON.stringify({
            status: "approved", // Met à jour le statut de la mission à "approved"
          }),
        }
      );
      if (response.ok) {
        alert("Mission approuvée");
        router.push("/approval-missions"); // Redirige vers la liste des missions après l’approbation
      } else {
        alert("Erreur lors de l'approbation de la mission");
      }
    } catch (err) {
      alert("Erreur lors de l'approbation");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Approbation de Mission</h1>
      <div>
        <h2>{mission?.introduction}</h2>
        <p>
          <strong>Objectifs de la mission:</strong>{" "}
          {mission?.mission_objectives}
        </p>
        <p>
          <strong>Activités prévues:</strong> {mission?.planned_activities}
        </p>
        <p>
          <strong>Ressources nécessaires:</strong>{" "}
          {mission?.necessary_resources}
        </p>
        <p>
          <strong>Conclusion:</strong> {mission?.conclusion}
        </p>
      </div>
      <button onClick={handleApproval}>Approuver la mission</button>
    </div>
  );
};

export default ApprovalMissions;
