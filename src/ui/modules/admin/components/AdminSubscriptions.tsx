"use client";

import { useEffect, useState } from "react";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdOutlineCancel, MdEdit, MdSearch } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Définition du type pour un abonnement
interface Subscription {
  id: number;
  user: {
    name: string;
    email: string;
  };
  plan: string;
  status: "active" | "expired" | "canceled";
  start_date: string;
  end_date: string;
}

// Composant principal de gestion des abonnements
export const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    Subscription[]
  >([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/subscriptions")
      .then((response) => response.json())
      .then((data: Subscription[]) => {
        setSubscriptions(data);
        setFilteredSubscriptions(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des abonnements :", error)
      );
  }, []);

  // Recherche d'abonnements
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const filtered = subscriptions.filter(
      (sub) =>
        sub.user.name.toLowerCase().includes(query) ||
        sub.user.email.toLowerCase().includes(query) ||
        sub.plan.toLowerCase().includes(query)
    );
    setFilteredSubscriptions(filtered);
  };

  // Annulation d'un abonnement
  const cancelSubscription = async (id: number) => {
    const confirmCancel = window.confirm(
      "Voulez-vous vraiment annuler cet abonnement ?"
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/subscriptions/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Échec de l'annulation de l'abonnement.");
      }

      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
      setFilteredSubscriptions(
        filteredSubscriptions.filter((sub) => sub.id !== id)
      );

      toast.success("Abonnement annulé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
      toast.error("Une erreur est survenue !");
    }
  };

  return (
    <div className="space-y-5 mb-10 border border-gray-300 p-8 rounded-lg shadow-md bg-white">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Typography variant="h5" theme="black" tag="h5">
        📋 Gestion des abonnements
      </Typography>

      {/* Barre de recherche */}
      <div className="flex items-center gap-2 border border-gray-400 rounded px-4 py-2">
        <MdSearch size={20} />
        <input
          type="text"
          placeholder="Rechercher un abonnement..."
          value={search}
          onChange={handleSearch}
          className="flex-1 outline-none"
        />
      </div>

      {/* Tableau des abonnements */}
      <table className="table-fixed w-full border border-gray-400">
        <thead className="text-left bg-gray-100">
          <tr>
            <th className="py-3 px-2">ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubscriptions.map((sub) => (
            <tr key={sub.id} className="border-t text-gray-700">
              <td className="py-3 px-2">{sub.id}</td>
              <td>{sub.user.name}</td>
              <td>{sub.user.email}</td>
              <td>{sub.plan}</td>
              <td>{new Date(sub.start_date).toLocaleDateString()}</td>
              <td>{new Date(sub.end_date).toLocaleDateString()}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded ${
                    sub.status === "active"
                      ? "bg-green-200 text-green-800"
                      : sub.status === "expired"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {sub.status}
                </span>
              </td>
              <td className="flex gap-2">
                <button className="text-blue-500 hover:underline">
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => cancelSubscription(sub.id)}
                  className="text-red-500 hover:underline"
                >
                  <MdOutlineCancel size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
