import clsx from "clsx";
import {Typography} from "@/ui/design-system/typography/typography";

interface Props {
    placeholder?: string,
    type: "text" | "email" | "password" | "date",
    register?: any,
    errors?: any,
    id: string,
    errorMessage?: string,
    required?: boolean,
    isAutoCompleted?: boolean,
    isLoading?: boolean,
    minLength?: number,
    maxLength?: number,
    pattern?: any,
    messagePattern?: string,
    passRegex?: RegExp[]
    pwd?: string
}

export const Input = ({
                          isLoading,
                          placeholder,
                          type = "text",
                          register,
                          errors,
                          id,
                          errorMessage = "Tu dois renseigner ce champ",
                          required = true,
                          isAutoCompleted = false,
                          minLength,
                          maxLength,
                          pattern,
                          messagePattern,
                          passRegex,
                          pwd
                      }: Props) => {
    return (
        <div className="space-y-2">
            <input
                type={type}
                placeholder={placeholder}
                className={clsx(
                    isLoading && "cursor-not-allowed",
                    errors[id] ? "placeholder-alert-danger text-alert-danger focus:ring-alert-danger" : "placeholder-gray-600 focus:ring-gray-400",
                    "p-4 max-sm:text-caption4 w-full font-white rounded focus:outline-none focus:ring-2 bg-gray-500 text-gray-800"
                )}
                disabled={isLoading}
                {...register(id, {
                    required: {
                        value: required,
                        message: errorMessage
                    },
                    minLength: {
                        value: minLength,
                        message: `Ce champ doit avoir au moins ${minLength} caractères`
                    },
                    maxLength: {
                        value: maxLength,
                        message: `Ce champ ne doit pas dépasser ${maxLength} caractères`
                    },
                    pattern: {
                        value: pattern,
                        message: messagePattern
                    },
                    validate: (value: string) => {
                        if (pwd) {
                            if (value !== pwd) {
                                return "Password doesn't match"
                            }
                        }
                        return(
                            passRegex?.every((pattern) => pattern.test(value)) || passRegex && "must include lower, upper, specialchars, number "
                        )
                    }
                })}
                autoComplete={isAutoCompleted ? "on" : "off"}
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