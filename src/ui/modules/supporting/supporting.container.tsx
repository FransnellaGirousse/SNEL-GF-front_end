"use client";

import { useState } from "react";
import { TiEyeOutline } from "react-icons/ti";
import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";

interface SupportingDocument {
  id: number;
  date: string;
  description: string;
  name: string;
  fileName: string;
  fileUrl: string;
}

const SupportingContainer = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Date actuelle (au format yyyy-mm-dd)
    description: "",
    name: "",
    file: null as File | null,
  });

  const [documents, setDocuments] = useState<SupportingDocument[]>([]);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] =
    useState<SupportingDocument | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.file ||
      !formData.date ||
      !formData.description ||
      !formData.name
    ) {
      setMessage("Tous les champs sont obligatoires.");
      return;
    }

    const newDocument: SupportingDocument = {
      id: documents.length + 1,
      date: formData.date,
      description: formData.description,
      name: formData.name,
      fileName: formData.file.name,
      fileUrl: URL.createObjectURL(formData.file),
    };

    setDocuments([...documents, newDocument]);
    setMessage("Pièce justificative ajoutée avec succès !");
    setFormData({
      date: new Date().toISOString().split("T")[0], // Reset to today's date
      description: "",
      name: "",
      file: null,
    });
  };

  // Get the documents for the current page
  const currentDocuments = documents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreview = (fileUrl: string) => {
    setPreviewFileUrl(fileUrl);
  };

  const handleShowDetails = (document: SupportingDocument) => {
    setSelectedDocument(document);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Formulaire à gauche */}
      <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg border-2 border-primary-400 mb-10 rounded">
        <Typography theme="black">
          <h1 className="text-2xl font-bold mb-4">
            Ajouter une Pièce Justificative
          </h1>
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-1"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Décrivez la pièce justificative..."
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Nom de la Personne
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nom du soumetteur"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-medium mb-2"
            >
              Ajouter un fichier (PDF ou image)
            </label>

            <div className="relative w-full">
              <input
                type="file"
                name="file"
                id="file"
                accept=".pdf,.jpg,.png,.jpeg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file: e.target.files ? e.target.files[0] : null,
                  })
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="border border-gray-300 p-3 rounded bg-white text-center cursor-pointer hover:bg-gray-100 transition">
                {formData.file ? (
                  <span className="text-gray-800">{formData.file.name}</span>
                ) : (
                  <span className="text-gray-700">Choisir un fichier</span>
                )}
              </div>
            </div>
          </div>

          <Button>
            <button type="submit">Soumettre</button>
          </Button>
        </form>
        {message && (
          <p
            className={`mt-4 ${
              message.includes("succès") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Tableau de bord à droite */}
      <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Tableau de Bord des Pièces Justificatives
        </h1>
        {documents.length === 0 ? (
          <p className="text-gray-500">
            Aucune pièce justificative ajoutée pour le moment.
          </p>
        ) : (
          <table className="table-auto w-full text-left border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Fichiers</th>
                <th className="px-4 py-2 border">Détails</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((document) => (
                <tr key={document.id}>
                  <td className="px-4 py-2 border">{document.id}</td>
                  <td className="px-4 py-2 border">{document.date}</td>
                  <td className="px-4 py-2 border">{document.name}</td>
                  <td className="px-4 py-2 border flex items-center gap-2">
                    <button
                      onClick={() => handlePreview(document.fileUrl)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <TiEyeOutline className="w-5 h-5" />
                    </button>
                    <a
                      href={document.fileUrl}
                      download={document.fileName}
                      className="text-green-500 hover:text-green-700"
                    >
                      <MdOutlineFileDownload className="w-5 h-5" />
                    </a>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleShowDetails(document)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal for Document Details */}
      {selectedDocument && (
        <div className="  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg border-2 border-primary-200 mb-10 rounded ">
            <h2 className="text-xl font-bold mb-4">
              Détails de la Pièce Justificative
            </h2>
            <p>
              <strong>ID:</strong> {selectedDocument.id}
            </p>
            <p>
              <strong>Date:</strong> {selectedDocument.date}
            </p>
            <p>
              <strong>Description:</strong> {selectedDocument.description}
            </p>
            <p>
              <strong>Nom:</strong> {selectedDocument.name}
            </p>

            <button
              className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 
             text-white font-semibold px-6 py-2 rounded-full shadow-md 
             transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCloseModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* File preview */}
      {previewFileUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Aperçu du fichier</h2>
            <iframe
              src={previewFileUrl}
              className="w-full h-64 border rounded"
              title="Aperçu du fichier"
            />
            <button
              onClick={() => setPreviewFileUrl(null)}
              className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 
             text-white font-semibold px-6 py-3 rounded-full shadow-md 
             transition duration-300 ease-in-out transform hover:scale-105"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportingContainer;
