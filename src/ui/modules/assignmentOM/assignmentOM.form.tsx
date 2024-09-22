import {FormsType} from "@/types/forms";
import {Input} from "@/ui/design-system/forms/input";
import {Button} from "@/ui/design-system/button/button";
import { FaRegCircleCheck } from "react-icons/fa6";
import {Typography} from "@/ui/design-system/typography/typography";

interface Props {
    form: FormsType
}

export const AssignmentOMForm = ({form}: Props) => {
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
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        isLoading={isLoading}
                        placeholder="Voyageur"
                        type="text"
                        register={register}
                        errors={errors}
                        id="traveler"
                    />
                    <Input
                        isLoading={isLoading}
                        type="date"
                        register={register}
                        errors={errors}
                        id="date"
                    />
                </div>
                <Typography
                    variant="lead"
                    tag="h5"
                >
                    Itinéraire Proposé
                </Typography>

                <div className="grid grid-cols-2 gap-2">
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
                        type="date"
                        register={register}
                        errors={errors}
                        id="date_hour"
                    />
                </div>
                <Button
                    isLoading={isLoading}
                    type="submit"
                    icon={{icon: FaRegCircleCheck}}
                    iconPosition="left"
                >
                    Ajouter à l'itinéraire
                </Button>

                <Input
                    isLoading={isLoading}
                    placeholder="Objet de la mission"
                    type="text"
                    register={register}
                    errors={errors}
                    id="Purpose_of_the_mission"
                />

                <Typography
                    variant="lead"
                    tag="h5"
                >
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
                <textarea className="placeholder-gray-600 focus:ring-primary p-4 w-full border border-midnight-600 font-white rounded focus:outline-none focus:ring-1 bg-midnight-700 text-white resize-none" name="" id="" placeholder="Autre details">
                </textarea>

                <Typography
                    variant="lead"
                    tag="h5"
                >
                    Autres Exigences Logistiques
                </Typography>



            </form>
        </>
    )
}