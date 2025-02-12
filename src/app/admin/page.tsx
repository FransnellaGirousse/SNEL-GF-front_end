"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ email: "", role: "utilisateur" });
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.email || data.role !== "gestionnaire") {
          router.push("/");
          return;
        }

        const usersRes = await fetch("http://localhost:8000/api/admin/users", {
          credentials: "include",
        });
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (err) {
        setError("Erreur de chargement des utilisateurs.");
        console.error(err);
        router.push("");
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = async (id: number, newRole: string) => {
    setLoading(id);
    setError(null);

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
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, role: newRole } : user
          )
        );
        setSuccess("Rôle mis à jour avec succès.");
      } else {
        setError("Erreur lors de la mise à jour du rôle.");
      }
    } catch (error) {
      setError("Une erreur est survenue.");
      console.error(error);
    } finally {
      setLoading(null);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.email) {
      setError("L'email est requis.");
      return;
    }
    setAdding(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:8000/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
        credentials: "include",
      });

      if (res.ok) {
        const createdUser = await res.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]);
        setNewUser({ email: "", role: "utilisateur" });
        setSuccess("Utilisateur ajouté avec succès.");
      } else {
        setError("Erreur lors de l'ajout de l'utilisateur.");
      }
    } catch (error) {
      setError("Une erreur est survenue.");
      console.error(error);
    } finally {
      setAdding(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      {error && <div className="text-black mb-4">{error}</div>}
      {success && <div className="text-black mb-4">{success}</div>}

      {/* Formulaire d'ajout d'utilisateur */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Ajouter un utilisateur
        </h2>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full text-black"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            className="border p-2 rounded text-black"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="utilisateur">Utilisateur</option>
            <option value="gestionnaire">Gestionnaire</option>
            <option value="comptable">Comptable</option>
            <option value="directeur">Directeur</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAddUser}
            disabled={adding}
          >
            {adding ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow-md rounded-md text-black">
          <thead className="bg-gray-200">
            <tr className="text-black">
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Rôle</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t text-black">
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    className="border p-2 rounded text-black"
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                    disabled={loading === user.id}
                  >
                    <option value="utilisateur">Utilisateur</option>
                    <option value="gestionnaire">Gestionnaire</option>
                    <option value="comptable">Comptable</option>
                    <option value="directeur">Directeur</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-center">
                  {loading === user.id && (
                    <span className="text-black">Mise à jour...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
