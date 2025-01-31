"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PdfPreviewProps {
  formRef: React.RefObject<HTMLDivElement>;
}

export const PdfPreview = ({ formRef }: PdfPreviewProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // 🔹 Fonction pour générer le PDF
  const generatePDF = async () => {
    if (!formRef.current) return;

    // 🔹 Convertir tout le formulaire en image
    const canvas = await html2canvas(formRef.current, {
      scale: 2, // Haute résolution
      useCORS: true, // Résolution des erreurs CORS
    });

    const imgData = canvas.toDataURL("image/png");

    // 🔹 Création du PDF
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

    // 🔹 Générer l'aperçu PDF
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="mt-6">
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Générer l'aperçu PDF
      </button>

      {pdfUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Aperçu du PDF</h2>
          <iframe src={pdfUrl} className="w-full h-96 border rounded-lg" />
        </div>
      )}
    </div>
  );
};
