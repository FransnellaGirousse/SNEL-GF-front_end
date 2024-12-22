import { FormsType, RegisterFormFieldsType } from "@/types/forms";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Button } from "@/ui/design-system/button/button";
import { VscGitPullRequest } from "react-icons/vsc";
import { Steps, StepTypography } from "@/ui/design-system/step/steps";
import { Step } from "@/types/step";
import { SubmitHandler } from "react-hook-form";
import { InformationExpense } from "@/ui/components/forms/expense/InformationExpense";
import { TableExpense } from "@/ui/components/forms/expense/TableExpense";
import { FinanceExpense } from "@/ui/components/forms/expense/FinanceExpense";
import { ProgramProjectManagerExpense } from "@/ui/components/forms/expense/ProgramProjectManagerExpense";
import { SignatureExpense } from "@/ui/components/forms/expense/SignatureExpense";
import { AiOutlineSignature } from "react-icons/ai";
import { AccountingExpense } from "@/ui/components/forms/expense/AccountingExpense";

interface Props {
  form: FormsType;
}

export const ExpenseForm = ({ form }: Props) => {
  const { step, steps, currentStepIndex, back, next } = useMultiStepForm([
    <InformationExpense form={form} />,
    <TableExpense form={form} />,
    <FinanceExpense form={form} />,
    <ProgramProjectManagerExpense form={form} />,
    <AccountingExpense form={form}/>,
    <SignatureExpense form={form} />,
  ]);
  const { handleSubmit, onSubmit, isLoading } = form;
  
  const stepsItems: Step[] = [
    { name: "Informations de l'employée", number: 1 },
    { name: "Tableau de dépense ", number: 2 },
    { name: "Spéciale fiance", number: 3 },
    { name: "Programme pour le manager", number: 4 },
    { name: "Comptabilité", number: 5 },
    {
      name: "Signature",
      number: 6,
      icon: <AiOutlineSignature className=" mx-auto" />,
    },
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
      <div className="grid grid-cols-6 gap-2">
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
              icon={{ icon: VscGitPullRequest }}
              iconPosition="left"
            >
              Soumettre la validation
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
