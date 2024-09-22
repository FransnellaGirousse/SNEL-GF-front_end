import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const InformationMissionReport = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return(
        <div className="grid grid-cols-2 gap-5">
            <Input
                isLoading={isLoading}
                type="date"
                register={register}
                errors={errors}
                id="date"
            />
            <Input
                isLoading={isLoading}
                placeholder="Objets"
                type="text"
                register={register}
                errors={errors}
                id="object"
            />
            <Input
                isLoading={isLoading}
                placeholder="Lieu de mission"
                type="text"
                register={register}
                errors={errors}
                id="mission_location"
            />
            <Input
                isLoading={isLoading}
                placeholder="Nom du missionnaire"
                type="text"
                register={register}
                errors={errors}
                id="name_of_missionary"
            />
        </div>
    )
}