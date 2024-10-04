import {FormsType} from "@/types/forms";
import {Input} from "@/ui/design-system/forms/input";
import {SelectCountry} from "@/ui/design-system/forms/selectCountry";
import {Typography} from "@/ui/design-system/typography/typography";

interface Props {
    form: FormsType
}

export const InformationsAdvanceForm = ({form}: Props) => {
    const {control, isLoading, register, errors} = form
    const today = new Date().toISOString().split('T')[0]
    return(
        <div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <Input
                    id="social_security_number"
                    type="text"
                    placeholder="Numéro de sécurité sociale"
                    register={register}
                    errors={errors}
                    required={true}
                    isLoading={isLoading}
                />
                <SelectCountry
                    control={control}
                    errors={errors}
                    id="nationality"
                />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5 items-center">
                <Input
                    id="address"
                    type="text"
                    placeholder="Adresse"
                    register={register}
                    errors={errors}
                    required={true}
                    isLoading={isLoading}
                />
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="gray"
                >
                    (Exemple: Lot ... Quartier Ville)
                </Typography>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                    <label htmlFor="date_requested">Date du requête :</label>
                    <Input
                        id="date_requested"
                        type="date"
                        register={register}
                        errors={errors}
                        required={true}
                        isLoading={isLoading}
                        defaultValue={today}
                    />
                </div>
                <div>
                    <label htmlFor="date_need_by">Date requise :</label>
                    <Input
                        id="date_need_by"
                        type="date"
                        register={register}
                        errors={errors}
                        required={true}
                        isLoading={isLoading}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <Input
                    id="purpose_of_travel"
                    type="text"
                    placeholder="Motif du voyage"
                    register={register}
                    errors={errors}
                    required={true}
                    isLoading={isLoading}
                />
                <Input
                    id="destination"
                    type="text"
                    placeholder="Destination"
                    register={register}
                    errors={errors}
                    required={true}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}