import { FormsType, RegisterFormFieldsType } from "@/types/forms";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Button } from "@/ui/design-system/button/button";
import { Steps, StepTypography } from "@/ui/design-system/step/steps";
import { Step } from "@/types/step";
import { SubmitHandler } from "react-hook-form";
import { InformationAccountForm } from "@/ui/components/forms/account/InformationAccountForm";
import { UploadAccountForm } from "@/ui/components/forms/account/uploadAccountForm";
import { GrSave } from "react-icons/gr";
import { RoleAccountForm } from "@/ui/components/forms/account/RoleAccountForm";


interface Props {
  form: FormsType;
}
export const AccountForm = ({ form }: Props) => {
  const { step, steps, currentStepIndex, back, next } = useMultiStepForm([
    <UploadAccountForm form={form} />,
    <InformationAccountForm form={form} />,
    <RoleAccountForm form={form} />,
  ]);
  const { handleSubmit, onSubmit, isLoading } = form;
  const stepsItems: Step[] = [
    { name: "Renseignements", number: 1 },
    { name: "Rôle", number: 2 },
    { name: "Objectifs de la mission", number: 3 },
  ];
  const verifyError: SubmitHandler<RegisterFormFieldsType> = async (
    formData
  ) => {
    next();
  };
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
              onClick={handleSubmit(verifyError)}
              disabled={isLoading}
            >
              <GrFormNextLink />
            </button>
          ) : (
            <Button
              isLoading={isLoading}
              type="submit"
              icon={{ icon: GrSave  }}
              iconPosition="left"
            >
              Enregistrer
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
