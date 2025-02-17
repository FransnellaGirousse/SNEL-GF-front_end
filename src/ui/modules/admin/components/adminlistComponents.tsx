"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDetails } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { Input } from "@/ui/design-system/forms/input";
import { Button } from "@/ui/design-system/button/button";

export const AdminListComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const onSubmit = (data: any) => {
    console.log("Nouvel Admin :", data);
    toggleModal();
  };

  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <Typography variant="h5" theme="black" tag="h5">
          <FaListUl className="inline mr-2" size={30} />
          Listes admins
        </Typography>
        <Button>
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2"
          >
            <IoPersonAddSharp size={20} />
            <span>Ajouter l'Admin</span>
          </button>
        </Button>
      </div>

      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">ID</th>
            <th>Date de création</th>
            <th>Existence</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          <tr>
            <td>16</td>
            <td>12/02/2025</td>
            <td>1 jour</td>
            <td>Rakoto</td>
            <td>rakoto@gmail.com</td>
            <td className="py-3 space-x-2">
              <button className="border border-gray-500 px-3 py-1 rounded hover:bg-gray-200">
                <MdDetails size={20} />
              </button>
              <button className="border border-gray-500 px-3 py-1 rounded hover:bg-gray-200">
                <TiUserDelete size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* MODAL FORMULAIRE DE CREATION D'ADMIN */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[500px]">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Créer un Admin
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Nom de l'admin"
                  register={register}
                  errors={errors}
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email de l'admin"
                  register={register}
                  errors={errors}
                  required
                  pattern={/^\S+@\S+\.\S+$/}
                  messagePattern="L'email n'est pas valide"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Mot de passe"
                  register={register}
                  errors={errors}
                  required
                  minLength={6}
                  maxLength={20}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="border border-gray-500 px-5 py-2 rounded-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="border border-gray-500 px-5 py-2 rounded-lg hover:bg-gray-100"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
