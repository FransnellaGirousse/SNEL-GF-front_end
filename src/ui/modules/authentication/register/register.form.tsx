
import {FormsType, RegisterFormFieldsType} from "@/types/forms";
import {Button} from "@/ui/design-system/button/button";
import { CiSaveUp1 } from "react-icons/ci";
import {Step} from "@/types/step";
import {Steps, StepTypography} from "@/ui/design-system/step/steps";
import {useMultiStepForm} from "@/hooks/useMultiStepForm";
import {NameRegisterForm} from "@/ui/components/forms/register/NameRegisterForm";
import {ContactRegisterForm} from "@/ui/components/forms/register/ContactRegisterForm";
import {PasswordRegisterForm} from "@/ui/components/forms/register/PasswordRegisterForm";
import {RoleRegisterForm} from "@/ui/components/forms/register/RoleRegisterForm";
import {GrFormNextLink, GrFormPreviousLink} from "react-icons/gr";
import {SubmitHandler} from "react-hook-form";

interface Props {
    form: FormsType
}

export const RegisterForm = ({form}: Props) => {
    const {step, steps, currentStepIndex, back, next} = useMultiStepForm([<NameRegisterForm form={form}/>, <ContactRegisterForm form={form} />, <PasswordRegisterForm form={form}/>, <RoleRegisterForm form={form} />])
    const {
        handleSubmit,
        onSubmit,
        isLoading
    } = form;
    const stepsItems: Step[] = [
        {name: "Nom et Prénom de l'utilisateur", number: 1},
        {name: "Contact de l'utilisateur", number: 2},
        {name: "Mot de passe de l'utilisateur", number: 3},
        {name: "Rôle de l'utilisateur", number: 4}
    ]
    const verifyError: SubmitHandler<RegisterFormFieldsType> = async (formData) => {
        next()
    }
    return (
        <>
            <div className="lg:hidden">
                <StepTypography name={stepsItems[currentStepIndex].name} number={stepsItems[currentStepIndex].number}/>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <Steps currentStepIndex={currentStepIndex + 1} steps={stepsItems}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
                {step}
                <div className="flex justify-between">
                    {currentStepIndex !== 0 &&
				        <button
					        type="button"
					        className="bg-primary hover:bg-primary-500 text-white rounded-full flex items-center justify-center w-[40px] h-[40px] transition-all text-2xl"
					        onClick={back}
					        disabled={isLoading}
				        >
					        <GrFormPreviousLink/>
				        </button>
                    }
                    {currentStepIndex !== steps.length - 1 ?
                        <button
                            type="button"
                            className="bg-primary hover:bg-primary-500 text-white rounded-full flex items-center justify-center w-[40px] h-[40px] transition-all text-2xl"
                            onClick={handleSubmit(verifyError)}
                            disabled={isLoading}
                        >
                            <GrFormNextLink/>
                        </button>
                        :
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            icon={{icon: CiSaveUp1}}
                            iconPosition="left"
                        >
                            S'Inscrire
                        </Button>
                    }
                </div>
            </form>
        </>
    )
}