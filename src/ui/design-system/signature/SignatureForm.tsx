// components/SignatureForm.tsx
import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { Button } from "@/ui/design-system/button/button";
import SignatureCanvas from "react-signature-canvas";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  signataires: { id: string; name: string; signature: string }[];
};



type SignatureFormProps = {
  onSubmit: (
    signataires: { id: string; name: string; signature: string }[]
  ) => void;
  initialSignataires?: { id: string; name: string; signature: string }[];
};


const SignatureForm = ({
  onSubmit,
  initialSignataires = [],
}: SignatureFormProps) => {
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      signataires: initialSignataires.length
        ? initialSignataires
        : [{ id: uuidv4(), name: "", signature: "" }],
    },
  });

  const [signataires, setSignataires] = useState(
    initialSignataires.length
      ? initialSignataires
      : [{ id: uuidv4(), name: "", signature: "" }]
  );
  const signatureRefs = useRef<any>({});

  const addSignataire = () => {
    const newSignataire = { id: uuidv4(), name: "", signature: "" };
    setSignataires((prev) => [...prev, newSignataire]);
  };

  const removeSignataire = (id: string) => {
    setSignataires((prev) => prev.filter((signataire) => signataire.id !== id));
  };

  const handleNameChange = (id: string, value: string) => {
    setSignataires((prev) =>
      prev.map((signataire) =>
        signataire.id === id ? { ...signataire, name: value } : signataire
      )
    );
  };

  const handleSignature = (id: string, signature: string) => {
    setSignataires((prev) =>
      prev.map((signataire) =>
        signataire.id === id ? { ...signataire, signature } : signataire
      )
    );
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignataires((prev) =>
          prev.map((signataire) =>
            signataire.id === id
              ? { ...signataire, signature: reader.result as string }
              : signataire
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(signataires))}
      className="space-y-6 mt-10 ml-10"
    >
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
                    width: 250,
                    height: 100,
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, signataire.id)}
              className="text-blue-500 font-medium"
            />

            {/* Bouton supprimer */}
            <button
              type="button"
              onClick={() => removeSignataire(signataire.id)}
              className="text-red-500"
            >
              <RiDeleteBin2Line size={25} />
            </button>
          </div>
        ))}
      </div>

      {/* Ajouter un signataire */}
      <div className="flex justify-center">
        <Button>
          <button
            type="button"
            className="bg-blue-500 text-black py-2 px-4 rounded-lg flex items-center"
            onClick={addSignataire}
          >
            Ajouter <FaFileSignature className="ml-2 text-white" />
          </button>
        </Button>
      </div>
    </form>
  );
};

export default SignatureForm;
