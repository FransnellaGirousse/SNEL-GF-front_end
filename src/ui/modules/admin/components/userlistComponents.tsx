"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDetails } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";

// Définition du type pour un utilisateur
interface User {
  id: number;
  firstname: string;
  email: string;
  role: string;
  created_at: string;
}

export const UserListComponents = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/users") 
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data)) 
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        )
      );
  }, []);

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <Typography variant="h5" theme="black" tag="h5">
        <FaListUl className="inline mr-2" size={30} />
        Listes des utilisateurs
      </Typography>

      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">ID</th>
            <th>Date de création</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="py-3">{user.id}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="py-3 space-x-2">
                  <Button
                    variant="outline"
                    icon={{ icon: MdDetails }}
                    iconPosition="left"
                    size="medium"
                  ></Button>
                  <Button
                    variant="outline"
                    icon={{ icon: TiUserDelete }}
                    iconPosition="right"
                  ></Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-3">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
