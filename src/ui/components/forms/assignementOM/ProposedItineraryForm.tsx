import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Typography } from "@/ui/design-system/typography/typography";
import { Button } from "@/ui/design-system/button/button";
import { FaRegCircleCheck } from "react-icons/fa6";


interface Props {
  form: FormsType;
}

export const ProposedItineraryForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <Typography variant="lead" tag="h5" theme="black" className="text-center">
        Itinéraire Proposé
      </Typography>

      <div className="grid grid-cols-2 gap-2">
        <Input
          isLoading={isLoading}
          type="date"
          register={register}
          errors={errors}
          id="date_hour"
        />
        <Input
          isLoading={isLoading}
          placeholder="Point de départ"
          type="text"
          register={register}
          errors={errors}
          id="starting_point"
        />
        <Input
          isLoading={isLoading}
          placeholder="Destination"
          type="text"
          register={register}
          errors={errors}
          id="destination"
        />
        <Input
          isLoading={isLoading}
          placeholder="Authorization  -  Airfare at Economy Class Only"
          type="text"
          register={register}
          errors={errors}
          id="other_details_hotel"
        />

        <Input
          isLoading={isLoading}
          placeholder="FUND/SPEEDKEY/CODE2/GEO/POT OF FUNDS/SUB"
          type="text"
          register={register}
          errors={errors}
          id="fund_speedkey"
        />

        <Input
          isLoading={isLoading}
          placeholder="Price "
          type="text"
          register={register}
          errors={errors}
          id="price"
        />
      </div>

      <Button
        isLoading={isLoading}
        type="submit"
        icon={{ icon: FaRegCircleCheck }}
        iconPosition="left"
      >
        Ajouter à l'itinéraire
      </Button>
    </>
  );
};
