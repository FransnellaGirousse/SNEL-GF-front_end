"use client";

import { Button } from "@/ui/design-system/button/button";
import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  signataires: { id: string; name: string; signature: string }[];
};

const SignatureForm = () => {
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      signataires: [{ id: uuidv4(), name: "", signature: "" }], // Un signataire par défaut
    },
  });

  const [signataires, setSignataires] = useState([
    { id: uuidv4(), name: "", signature: "" },
  ]);
  const signatureRefs = useRef<any>({}); // Références pour les signatures de chaque signataire

  // Ajouter un nouveau signataire
  const addSignataire = () => {
    const newSignataire = { id: uuidv4(), name: "", signature: "" };
    setSignataires((prev) => [...prev, newSignataire]);
  };

  // Supprimer un signataire
  const removeSignataire = (id: string) => {
    setSignataires((prev) => prev.filter((signataire) => signataire.id !== id));
  };

  // Gérer le changement du nom
  const handleNameChange = (id: string, value: string) => {
    setSignataires((prev) =>
      prev.map((signataire) => {
        if (signataire.id === id) {
          return { ...signataire, name: value };
        }
        return signataire;
      })
    );
  };

  // Gérer la signature du signataire
  const handleSignature = (id: string, signature: string) => {
    setSignataires((prev) =>
      prev.map((signataire) => {
        if (signataire.id === id) {
          return { ...signataire, signature };
        }
        return signataire;
      })
    );
  };

  // Fonction pour télécharger une image de signature
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignataires((prev) =>
          prev.map((signataire) => {
            if (signataire.id === id) {
              return { ...signataire, signature: reader.result as string }; // Met l'image téléchargée dans la signature
            }
            return signataire;
          })
        );
      };
      reader.readAsDataURL(file); // Convertir l'image en base64
    }
  };

  // Soumettre le formulaire
  const onSubmit = () => {
    const signatairesWithSignatures = signataires.map((signataire) => ({
      ...signataire,
      signature: signatureRefs.current[signataire.id]?.toDataURL(),
    }));
    console.log(signatairesWithSignatures);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-8">
        {signataires.map((signataire, index) => (
          <div
            key={signataire.id}
            className="border p-4 rounded-md shadow-lg flex flex-col items-center text-center"
            style={{ maxWidth: "300px" }}
          >
            {/* Signature */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-black mb-2">
                Signature de {signataire.name || `Signataire ${index + 1}`}
              </label>

              {/* Si la signature est déjà téléchargée, l'afficher comme image */}
              {signataire.signature ? (
                <img
                  src={signataire.signature}
                  alt={`Signature de ${
                    signataire.name || `Signataire ${index + 1}`
                  }`}
                  className="border-2 border-gray-300 rounded mb-2"
                  style={{ width: 250, height: 100 }}
                />
              ) : (
                <SignatureCanvas
                  ref={(ref) => (signatureRefs.current[signataire.id] = ref)}
                  penColor="black"
                  canvasProps={{
                    width: 250, // Largeur réduite pour trois signatures sur une ligne
                    height: 100, // Hauteur réduite pour bien adapter
                    className:
                      "signatureCanvas border-2 border-gray-300 rounded",
                  }}
                  onEnd={() =>
                    handleSignature(
                      signataire.id,
                      signatureRefs.current[signataire.id].toDataURL()
                    )
                  }
                />
              )}
            </div>

            {/* Nom du signataire */}
            <div className="mb-4 w-full">
              <label
                htmlFor={`name-${signataire.id}`}
                className="text-black font-medium"
              >
                Nom du signataire {index + 1}
              </label>
              <Controller
                name={`signataires[${index}].name`}
                control={control}
                defaultValue={signataire.name}
                render={({ field }) => (
                  <input
                    {...field}
                    id={`name-${signataire.id}`}
                    onChange={(e) =>
                      handleNameChange(signataire.id, e.target.value)
                    }
                    className="border p-2 w-full rounded-md"
                  />
                )}
              />
            </div>

            {/* Bouton pour télécharger la signature */}
            <Button>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, signataire.id)}
                className="text-blue-500 font-medium"
              />
            </Button>

            {/* Bouton supprimer */}
            <Button>
              <button
                type="button"
                onClick={() => removeSignataire(signataire.id)}
                className="text-red-500 font-medium"
              >
                Supprimer ce signataire
              </button>
            </Button>
          </div>
        ))}
      </div>

      {/* Ajouter un signataire */}
      <div className="flex justify-center">
        <Button>
          <button
            type="button"
            onClick={addSignataire}
            className="bg-blue-500 text-black py-2 px-4 rounded-lg"
          >
            Ajouter un autre signataire
          </button>
        </Button>
      </div>

      {/* Soumettre le formulaire */}
      <div className="flex justify-center mt-6">
        <Button>
          <button
            type="submit"
            className="bg-green-500 text-black py-2 px-6 rounded-lg"
          >
            Soumettre et générer le PDF
          </button>
        </Button>
      </div>
    </form>
  );
};

export default SignatureForm;
