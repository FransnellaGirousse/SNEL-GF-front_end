"use client"

import {FormsType} from "@/types/forms";
import {Input} from "@/ui/design-system/forms/input";
import {SelectCountry} from "@/ui/design-system/forms/selectCountry";
import {Typography} from "@/ui/design-system/typography/typography";
import {useState} from "react";

interface Props {
    form: FormsType
}

export const PaymentAdvanceForm = ({form}: Props) => {
    const {control, isLoading, register, errors} = form
    const [paymentShow, setPayment] = useState<boolean>(false)
    const paymentBank = () => {
        setPayment(p => !p )
    }
    return(
        <div className="grid grid-cols-2 gap-2">
            <button>
                Virement en espèce
            </button>
            <button onClick={paymentBank}>
                Virement bancaire
            </button>
            {paymentShow &&
	            <div className="grid grid-cols-2 gap-5 mb-5">
		            <Input
			            id="special_mailing_instruction"
			            type="text"
			            placeholder="Instruction postale spéciale"
			            register={register}
			            errors={errors}
			            required={true}
			            isLoading={isLoading}
		            />
		            <Input
			            id="amount_requested"
			            type="text"
			            placeholder="Instruction postale spéciale"
			            register={register}
			            errors={errors}
			            required={true}
			            isLoading={isLoading}
		            />
	            </div>
            }
        </div>
    )
}