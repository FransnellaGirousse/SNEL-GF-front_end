import clsx from "clsx";
import {Typography} from "@/ui/design-system/typography/typography";
import {Controller} from "react-hook-form";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber'

interface Props {
    placeholder?: string,
    errors?: any,
    id: string,
    isLoading?: boolean,
    control: any
}

export const PhoneInputNumber = ({
                          isLoading,
                          placeholder,
                          errors,
                          id,
                          control
                      }: Props) => {
    const phoneUtil = PhoneNumberUtil.getInstance()
    const isPhoneValid = (phone: string) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
        } catch (error) {
            return false
        }
    }
    return (
        <div className="space-y-2">
            <label htmlFor={id}>Numéro de Télephone :</label>
            <Controller
                name={id}
                control={control}
                rules={
                    {
                        required: {
                            value: true,
                            message: "Tu dois renseigner ce champ"
                        },
                        validate: (value: string) => {
                            const isValid = isPhoneValid(value)
                            if (!isValid) {
                                return "Votre numero n'est pas valide"
                            }
                        }
                    }
                }
                render={({ field: { onChange, value } }) => (
                    <PhoneInput
                        value={value}
                        onChange={onChange}
                        className={clsx(
                            isLoading && "cursor-not-allowed",
                            errors[id] ? "placeholder-alert-danger text-alert-danger focus:ring-alert-danger" : "placeholder-gray-600 focus:ring-gray-400",
                            "p-4 max-sm:text-caption4 w-full font-white rounded focus:outline-none focus:ring-2 bg-gray-500 text-gray-800"
                        )}
                        placeholder={placeholder}
                        defaultCountry="mg"
                        disabled={isLoading}
                        style={
                            {
                                "--react-international-phone-background-color": "#E5E5E5",
                                "--react-international-phone-border-color": "#E5E5E5",
                                "--react-international-phone-text-color": "#333",
                                "--react-international-phone-font-size": "16px"
                            } as React.CSSProperties
                        }
                    />
                )}
            />
            {errors[id] &&
			    <Typography
				    variant="caption4"
				    tag="div"
				    theme="danger"
			    >
                    {errors[id]?.message}
			    </Typography>
            }
        </div>
    )
}