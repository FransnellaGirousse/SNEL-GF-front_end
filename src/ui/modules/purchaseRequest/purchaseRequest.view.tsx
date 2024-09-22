import {FormsType} from "@/types/forms";
import {PurchaseRequestForm} from "@/ui/modules/purchaseRequest/purchaseRequest.form";

interface Props {
    form: FormsType
}

export const PurchaseRequestView = ({form}: Props) => {
    return (
        <PurchaseRequestForm form={form} />
    )
}