"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Vérifier l'authentification et récupérer les utilisateurs
  useEffect(() => {
    fetch("http://localhost:8000/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.email || data.role !== "gestionnaire") {
          router.push("/"); // Redirige si l'utilisateur n'est pas gestionnaire
        } else {
          fetch("http://localhost:8000/api/admin/users", {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((usersData) => setUsers(usersData))
            .catch((error) =>
              console.error("Erreur de chargement des utilisateurs", error)
            );
        }
      })
      .catch(() => router.push("/"));
  }, []);

  // Modifier le rôle d'un utilisateur
  const handleUpdateRole = async (id: number, newRole: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/admin/users/${id}/role`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
          credentials: "include",
        }
      );

      if (res.ok) {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, role: newRole } : user
          )
        );
      } else {
        console.error("Erreur lors de la mise à jour du rôle");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      {/* Liste des utilisateurs */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Rôle</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">
                <select
                  value={user.role}
                  onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                >
                  <option value="utilisateur">Utilisateur</option>
                  <option value="gestionnaire">Gestionnaire</option>
                  <option value="comptable">Comptable</option>
                  <option value="directeur">Directeur</option>
                </select>
              </td>
              <td className="py-2 px-4 border">
                {loading && <span>Chargement...</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
