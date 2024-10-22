import {Input} from "@/ui/design-system/forms/input";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const InformationMissionReport = ({form}: Props) => {
    const {isLoading, register, errors} = form
    return (
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <Input
          isLoading={isLoading}
          type="date"
          register={register}
          errors={errors}
          id="date"
          required={true}
          pattern={
            /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
          }
          messagePattern="Date invalide"
        />
        <Input
          isLoading={isLoading}
          placeholder="Nom du missionnaire"
          type="text"
          register={register}
          errors={errors}
          id="name_of_missionary"
          required={true}
          minLength={3}
        />
        <Input
          isLoading={isLoading}
          placeholder="Objets"
          type="text"
          register={register}
          errors={errors}
          id="object"
          required={true}
          minLength={4}
        />
        <Input
          isLoading={isLoading}
          placeholder="Lieu de mission"
          type="text"
          register={register}
          errors={errors}
          id="mission_location"
          required={true}
          minLength={4}
        />
      </div>
    );
}