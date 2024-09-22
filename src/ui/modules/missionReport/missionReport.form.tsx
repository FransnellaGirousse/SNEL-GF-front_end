import {FormsType} from "@/types/forms";
import {useMultiStepForm} from "@/hooks/useMultiStepForm";
import {InformationMissionReport} from "@/ui/components/forms/InformationMissionReport";
import {ObjectivesMissionReport} from "@/ui/components/forms/ObjectivesMissionReport";
import {ProgressOfActivitiesMissionReport} from "@/ui/components/forms/ProgressMissionReport";
import {ResultMissionReport} from "@/ui/components/forms/ResultMissionReport";
import {RecommandationsMissionReport} from "@/ui/components/forms/RecommandationsMissionReport";
import {NextStepMissionReport} from "@/ui/components/forms/NextStepMissionReport";
import {GrFormNextLink, GrFormPreviousLink} from "react-icons/gr";
import {Button} from "@/ui/design-system/button/button";
import {VscGitPullRequest} from "react-icons/vsc";
import {MissionReportStep} from "@/ui/design-system/step/missionReportStep";

interface Props {
    form: FormsType
}

export const MissionReportForm = ({form}: Props) => {
    const {step, steps, currentStepIndex, back, next} = useMultiStepForm([<InformationMissionReport form={form} />, <ObjectivesMissionReport form={form} />, <ProgressOfActivitiesMissionReport form={form} />, <ResultMissionReport form={form} />, <RecommandationsMissionReport form={form} />, <NextStepMissionReport form={form} />])
    const {
        handleSubmit,
        onSubmit,
        isLoading
    } = form;
    return (
        <>
            <div
                className="grid grid-cols-6 gap-2">
                <MissionReportStep currentStepIndex={currentStepIndex + 1}/>
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
                            Soumettre la validation
                        </Button>
                    }
                </div>
            </form>
        </>
    )
}