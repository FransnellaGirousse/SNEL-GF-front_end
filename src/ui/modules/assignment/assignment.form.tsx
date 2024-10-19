import {FormsType} from "@/types/forms";
import {Input} from "@/ui/design-system/forms/input";
import {Button} from "@/ui/design-system/button/button";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Typography } from "@/ui/design-system/typography/typography";
import { Textarea } from "@/ui/design-system/forms/textarea";

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
          <Typography
            variant="h5"
            tag="h1"
            theme="black"
            className="text-center"
          >
            TERMES DE REFERENCE DE LA MISSION
          </Typography>

          <Input
            isLoading={isLoading}
            type="text"
            placeholder="Introduction"
            register={register}
            errors={errors}
            id="introduction"
          />

          <Textarea
            isLoading={isLoading}
            placeholder="Objectifs de la mission"
            register={register}
            errors={errors}
            id="mission_objectives"
          />
          <Textarea
            isLoading={isLoading}
            placeholder="Activités prévues"
            register={register}
            errors={errors}
            id="planned_activities"
          />
          <Textarea
            isLoading={isLoading}
            placeholder="Ressources nécessaires"
            register={register}
            errors={errors}
            id="necessary_resources"
          />

          <Input
            isLoading={isLoading}
            placeholder="Conclusion"
            type="text"
            register={register}
            errors={errors}
            id="conclusion"
          />

          <Button
            isLoading={isLoading}
            type="submit"
            icon={{ icon: FaRegCircleCheck }}
            iconPosition="left"
          >
            Soumettre Pour Validation
          </Button>
        </form>
      </>
    );
}