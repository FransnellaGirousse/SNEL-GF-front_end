"use client";

import { FormsType, RegisterFormFieldsType } from "@/types/forms";
import { Button } from "@/ui/design-system/button/button";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { VscGitPullRequest } from "react-icons/vsc";
import { Steps, StepTypography } from "@/ui/design-system/step/steps";
import { Step } from "@/types/step";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineSignature } from "react-icons/ai";
import SignatureForm from "@/ui/design-system/signature/SignatureForm";
import { AmountPurchaseForm } from "@/ui/components/forms/purchase_request/AmountPurchaseForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { PdfPreview } from "@/ui/design-system/pdf/PdfPreview"; 


interface Props {
  form: FormsType;
}

export const PurchaseRequestForm = ({ form }: Props) => {
  const { step, steps, currentStepIndex, back, next } = useMultiStepForm([
    <AmountPurchaseForm form={form} />,
    <SignatureForm form={form} />,
    <PdfPreview formRef={useRef<HTMLDivElement>(null)} />, // ✅ Ajout de l'aperçu PDF comme étape finale
  ]);

  const { handleSubmit, isLoading, onSubmit } = form;
  const pdfRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // 🔹 Fonction pour générer le PDF après signature
  const generatePDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

    // 🔹 Convertir le PDF en URL pour affichage dans un iframe
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  const verifyError: SubmitHandler<RegisterFormFieldsType> = async (
    formData
  ) => {
    next();
    if (currentStepIndex === steps.length - 2) {
      generatePDF();
    }
  };

  const stepsItems: Step[] = [
    { name: "Informations de la demande", number: 1 },
    {
      name: "Signature",
      number: 2,
      icon: <AiOutlineSignature className=" mx-auto" />,
    },
    {
      name: "Aperçu PDF",
      number: 3,
      icon: <VscGitPullRequest className="mx-auto" />,
    },
  ];

  return (
    <>
      <div className="lg:hidden">
        <StepTypography
          name={stepsItems[currentStepIndex].name}
          number={stepsItems[currentStepIndex].number}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Steps currentStepIndex={currentStepIndex + 1} steps={stepsItems} />
      </div>

      {/* 🔹 Affichage du formulaire ou du PDF */}
      <div ref={pdfRef} className="pt-8 pb-5 space-y-4">
        {step}
      </div>

      {currentStepIndex === steps.length - 1 && pdfUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Aperçu du PDF</h2>
          <iframe src={pdfUrl} className="w-full h-96 border rounded-lg" />
        </div>
      )}

      <div className="flex justify-between mt-4">
        {currentStepIndex !== 0 && (
          <button
            type="button"
            className="bg-primary hover:bg-primary-500 text-white rounded-full flex items-center justify-center w-[40px] h-[40px] transition-all text-2xl"
            onClick={back}
            disabled={isLoading}
          >
            <GrFormPreviousLink />
          </button>
        )}

        {currentStepIndex !== steps.length - 1 ? (
          <button
            type="button"
            className="bg-primary hover:bg-primary-500 text-white rounded-full flex items-center justify-center w-[40px] h-[40px] transition-all text-2xl"
            onClick={handleSubmit(verifyError)}
            disabled={isLoading}
          >
            <GrFormNextLink />
          </button>
        ) : (
          <Button
            isLoading={isLoading}
            type="submit"
            icon={{ icon: VscGitPullRequest }}
            iconPosition="left"
          >
            Soumettre la demande
          </Button>
        )}
      </div>
    </>
  );
};
