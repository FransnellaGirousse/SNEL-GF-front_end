"use client"

import {FormsType} from "@/types/forms";
import {Button} from "@/ui/design-system/button/button";
import { FaRegCircleCheck } from "react-icons/fa6";
import { SubmitHandler } from "react-hook-form";
import { AssignmentFormFieldsType } from "@/types/forms";
import { Step } from "@/types/step";
import {useMultiStepForm} from "@/hooks/useMultiStepForm";
import { Steps, StepTypography } from "@/ui/design-system/step/steps";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { IntroductionForm } from "@/ui/components/forms/assignment/IntroductionForm"
import { ObjectivesForm } from "@/ui/components/forms/assignment/ObjectivesForm";
import { ActivityForm } from "@/ui/components/forms/assignment/ActivityForm";
import { RessourcesForm } from "@/ui/components/forms/assignment/RessourcesForm";
import { ConclusionForm } from "@/ui/components/forms/assignment/ConclusionForm";


interface Props {
    form: FormsType
}

export const AssignmentForm = ({form}: Props) => {
  const { step, steps, currentStepIndex, back, next } = useMultiStepForm([
     <IntroductionForm form={form} />,
     <ObjectivesForm form={form} />,
    <ActivityForm form={form} />,
    <RessourcesForm form={form} />,
    <ConclusionForm form={form} />,
   
  ]);
  const {
        handleSubmit,
        onSubmit,
        isLoading
    } = form;
    const verifyError : SubmitHandler<AssignmentFormFieldsType> = async (formData) => {
      next()
    }   
    const stepsItems: Step[] = [
      { name: "Titre et introduction", number: 1 },
      { name: "Objectif de la mission", number: 2 },
      { name: "Activités Prévus", number: 3 },
      { name: "Ressources nécessaires", number: 4 },
      { name: "Conclusion", number: 5 },
    ]; 
    return (
      <>
        <div className="lg:hidden">
          <StepTypography
            name={stepsItems[currentStepIndex].name}
            number={stepsItems[currentStepIndex].number}
          />
        </div>
        <div className="grid grid-cols-5 gap-2">
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
