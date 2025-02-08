"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Vérifier si l'utilisateur est bien admin
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/users", {
          method: "GET",
          credentials: "include", // Utiliser les cookies si Laravel gère la session
        });

        if (res.status === 401) {
          router.push("/login"); // Rediriger vers la connexion si non admin
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
