"use client"

import {AssignmentOMFormFieldsType, FormsType} from "@/types/forms";
import { Step } from "@/types/step";
import { Steps, StepTypography } from "@/ui/design-system/step/steps";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { HotelForm } from "@/ui/components/forms/assignementOM/HotelForm";
import { ProposedItineraryForm } from "@/ui/components/forms/assignementOM/ProposedItineraryForm";
import { LogisticalForm } from "@/ui/components/forms/assignementOM/LogisticalForm";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@/ui/design-system/button/button";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TravelForm } from "@/ui/components/forms/assignementOM/TravelForm";

interface Props {
    form: FormsType
}

export const  AssignmentOMForm = ({form}: Props) => {
  const { step, steps, currentStepIndex, back, next } = useMultiStepForm([
    <TravelForm form={form} />,
    <ProposedItineraryForm form={form} />,
    <HotelForm form={form} />,
    <LogisticalForm form={form} />,
  ]);

  const { handleSubmit, onSubmit, isLoading } = form;
  const verifyError: SubmitHandler<AssignmentOMFormFieldsType> = async (
    formData
  ) => {
    next();
  };
  const stepsItems: Step[] = [
    { name: "A propos de la mission", number: 1 },
    { name: "Proposition d'itineraire", number: 2 },
    { name: "Détails d'hébergement", number: 3 },
    { name: "Moyen de trasport", number: 4 },
  ];

    return (
      <>
        <div className="lg:hidden">
          <StepTypography
            name={stepsItems[currentStepIndex].name}
            number={stepsItems[currentStepIndex].number}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Steps currentStepIndex={currentStepIndex + 1} steps={stepsItems} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
          {step}
          <div className="flex justify-between">
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
                onClick={() => handleSubmit(verifyError)()}
                disabled={isLoading}
              >
                <GrFormNextLink />
              </button>
            ) : (
              <Button
                isLoading={isLoading}
                type="submit"
                icon={{ icon: FaRegCircleCheck }}
                iconPosition="left"
              >
                Soumettre la demande
              </Button>
            )}
          </div>
        </form>
      </>
    );
}