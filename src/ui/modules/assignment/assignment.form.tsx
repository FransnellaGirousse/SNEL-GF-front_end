import {FormsType} from "@/types/forms";
import {Input} from "@/ui/design-system/forms/input";
import {Button} from "@/ui/design-system/button/button";
import { FaRegCircleCheck } from "react-icons/fa6";

interface Props {
    form: FormsType
}

export const AssignmentForm = ({form}: Props) => {
    const {
        handleSubmit,
        errors,
        register,
        onSubmit,
        isLoading
    } = form;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
                <Input
                    isLoading={isLoading}
                    placeholder="Objectifs de la mission"
                    type="text"
                    register={register}
                    errors={errors}
                    id="mission_objectives"
                />
                <Input
                    isLoading={isLoading}
                    placeholder="Activités prévues"
                    type="text"
                    register={register}
                    errors={errors}
                    id="planned_activities"
                />
                <Input
                    isLoading={isLoading}
                    placeholder="Ressources nécessaires"
                    type="text"
                    register={register}
                    errors={errors}
                    id="necessary_resources"
                />
                <Button
                    isLoading={isLoading}
                    type="submit"
                    icon={{icon: FaRegCircleCheck}}
                    iconPosition="left"
                >
                    Soumettre Pour Validation
                </Button>
            </form>
        </>
    )
}