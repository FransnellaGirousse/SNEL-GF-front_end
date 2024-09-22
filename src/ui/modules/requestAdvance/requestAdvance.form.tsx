"use client"

import {FormsType} from "@/types/forms";
import {Button} from "@/ui/design-system/button/button";
import {GrFormNextLink, GrFormPreviousLink} from "react-icons/gr";
import {useMultiStepForm} from "@/hooks/useMultiStepForm";
import {InformationsAdvanceForm} from "@/ui/components/forms/InformationsAdvanceForm";
import {CoefficientAdvanceForm} from "@/ui/components/forms/CoefficientAdvanceForm";
import {SignatureAdvanceForm} from "@/ui/components/forms/SignatureAdvanceForm";
import { VscGitPullRequest } from "react-icons/vsc";
import {Step} from "@/ui/design-system/step/step";

interface Props {
    form: FormsType
}

export const RequestAdvanceForm = ({form}: Props) => {
    const {step, steps, currentStepIndex, back, next} = useMultiStepForm([<InformationsAdvanceForm form={form} />, <CoefficientAdvanceForm form={form} />, <SignatureAdvanceForm form={form} />])
    const {
        handleSubmit,
        isLoading,
        onSubmit
    } = form;
    return(
        <>
            <div
                className="grid grid-cols-3 gap-2">
                <Step currentStepIndex={currentStepIndex + 1} />
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
                            onClick={next}
                            disabled={isLoading}
                        >
                            <GrFormNextLink/>
                        </button>
                        :
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            icon={{icon: VscGitPullRequest}}
                            iconPosition="left"
                        >
                            Soumettre la demande
                        </Button>
                    }
                </div>
            </form>
        </>
    )
}