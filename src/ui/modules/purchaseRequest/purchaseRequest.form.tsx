import {FormsType} from "@/types/forms";
import {Textarea} from "@/ui/design-system/forms/textarea";
import {Input} from "@/ui/design-system/forms/input";
import {Button} from "@/ui/design-system/button/button";
import { BiSolidPurchaseTag } from "react-icons/bi";

interface Props {
    form: FormsType
}

export const PurchaseRequestForm = ({form}: Props) => {
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
                <Textarea
                    isLoading={isLoading}
                    placeholder="Article"
                    register={register}
                    errors={errors}
                    id="item"
                />
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Quantité"
                        register={register}
                        errors={errors}
                        id="quantity"
                    />
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Type d'unité"
                        register={register}
                        errors={errors}
                        id="unit_type"
                    />
                </div>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Description"
                        register={register}
                        errors={errors}
                        id="description"
                    />
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Prix d'unité estimé"
                        register={register}
                        errors={errors}
                        id="estimated_unit_price"
                    />
                </div>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Total estimé"
                        register={register}
                        errors={errors}
                        id="estimated_total"
                    />
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Notes"
                        register={register}
                        errors={errors}
                        id="notes"
                    />
                </div>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Code du projet"
                        register={register}
                        errors={errors}
                        id="project_code"
                    />
                    <Input
                        type="text"
                        isLoading={isLoading}
                        placeholder="Code géographique"
                        register={register}
                        errors={errors}
                        id="geo_code"
                    />
                </div>
                <Button
                    isLoading={isLoading}
                    type="submit"
                    icon={{icon: BiSolidPurchaseTag}}
                    iconPosition="left"
                >
                    Soumettre la demande
                </Button>
            </form>
        </>
    )
}