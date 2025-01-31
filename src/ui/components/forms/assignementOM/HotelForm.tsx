import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Textarea } from "@/ui/design-system/forms/textarea";
import { Typography } from "@/ui/design-system/typography/typography";


interface Props {
  form: FormsType;
}

export const HotelForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Typography variant="lead" tag="h5" theme="black" className="text-center">
        Détails de l'Hôtel
      </Typography>

      <div className="grid grid-cols-2 gap-2">
        <Input
          isLoading={isLoading}
          placeholder="Nom de l'Hôtel"
          type="text"
          register={register}
          errors={errors}
          id="name_of_the_hotel"
        />
        <Input
          isLoading={isLoading}
          placeholder="Tarif de la chambre"
          type="text"
          register={register}
          errors={errors}
          id="room_rate"
        />
        <Input
          isLoading={isLoading}
          placeholder="Nombre de confirmation"
          type="text"
          register={register}
          errors={errors}
          id="confirmation_number"
        />
        <Input
          isLoading={isLoading}
          type="date"
          register={register}
          errors={errors}
          id="date_hotel"
        />
      </div>
      <Textarea
        isLoading={isLoading}
        placeholder="Autres détails à propos de l'hotel"
        register={register}
        errors={errors}
        id="other_details_hotel"
      />
    </>
  );
};
