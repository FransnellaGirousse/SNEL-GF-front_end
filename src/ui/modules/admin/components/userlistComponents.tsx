"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDetails, MdSearch } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

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
   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const [search, setSearch] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const usersPerPage = 10;

  // Récupération des utilisateurs
  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((response) => response.json())
      .then((data: User[]) => {
        setUsers(data.reverse()); // On inverse pour avoir les plus récents en premier
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        )
      );
  }, []);

  // Fonction de suppression d'un utilisateur avec notification
  const deleteUser = async (userId: number) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Échec de la suppression de l'utilisateur.");
      }

      setUsers(users.filter((user) => user.id !== userId));
      toast.success("Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Une erreur s'est produite lors de la suppression.");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const filtered = users.filter((user) =>
      user.firstname.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };

  // Pagination - Calcul des utilisateurs à afficher
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Typography variant="h5" theme="black" tag="h5">
        <FaListUl className="inline mr-2" size={30} />
        Liste des utilisateurs
      </Typography>

      {/* Barre de recherche */}
      <div className="flex items-center border border-gray-400 rounded px-4 py-2">
        <MdSearch size={20} />
        <input
          type="text"
          placeholder="Rechercher par prénom..."
          value={search}
          onChange={handleSearch}
          className="flex-1 outline-none ml-2"
        />
      </div>

      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">ID</th>
            <th>Date de création</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-3">{user.id}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="py-3 space-x-2">
                  {/* Bouton Détails */}
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="border border-gray-500 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    <MdDetails size={20} />
                  </button>

                  {/* Bouton Supprimer avec notification */}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="border border-gray-500 px-3 py-1 rounded hover:bg-red-200"
                  >
                    <TiUserDelete size={20} />
                  </button>
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
        <span> {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastUser < users.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastUser >= users.length}
          className={`px-4 py-2 border rounded ${
            indexOfLastUser >= users.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Suivant
        </button>
      </div>

      {/* Modale pour afficher les détails de l'utilisateur */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
            <Typography variant="h5" theme="black">
              Détails de l'utilisateur
            </Typography>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Nom:</strong> {selectedUser.firstname}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Rôle:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Date de création:</strong>{" "}
              {new Date(selectedUser.created_at).toLocaleDateString()}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-3 border border-gray-500 px-3 py-1 rounded hover:bg-gray-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
