import { FormsType } from "@/types/forms"
import { AccountForm } from "@/ui/modules/account/account.form";

interface Props {
    form: FormsType;
}
export const AccountView = ({form}: Props) => {
    return (
        <AccountForm form={form} />
    )
}