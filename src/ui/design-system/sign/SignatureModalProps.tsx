import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas"; // Assurez-vous d'installer react-signature-canvas

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageData: string) => void; // Fonction callback pour envoyer l'image au parent
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const signatureRef = useRef<SignatureCanvas | null>(null); // Référence au canvas de la signature
  const [signatureDataUrl, setSignatureDataUrl] = useState<string>("");

  // Fonction pour sauvegarder la signature
  const saveSignature = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL();
      setSignatureDataUrl(dataUrl); // Optionnel, si tu veux afficher l'image après
      onSave(dataUrl); // Envoie l'image au parent
      onClose(); // Ferme le modal après la sauvegarde
    }
  };

  // Fonction pour effacer la signature
  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignatureDataUrl(""); // Réinitialiser l'aperçu de l'image
    }
  };

  if (!isOpen) return null; // Si le modal est fermé, ne rien afficher

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Veuillez signer ci-dessous
        </h2>

        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            className: "border border-gray-300 w-full h-40", // Style du canvas
          }}
        />

        <div className="mt-4 flex justify-between">
          <button
            onClick={clearSignature}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
          >
            Effacer
          </button>
          <button
            onClick={saveSignature}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sauvegarder
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SignatureModal;
