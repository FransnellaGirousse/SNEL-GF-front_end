import clsx from "clsx";
import {Typography} from "@/ui/design-system/typography/typography";

interface Props {
    placeholder?: string,
    type: "text" | "email" | "password" | "date" | "number",
    register?: any,
    errors?: any,
    id: string,
    errorMessage?: string,
    required?: boolean,
    isAutoCompleted?: boolean,
    isLoading?: boolean
}

export const AdvanceInput = ({
                          isLoading,
                          placeholder,
                          type = "text",
                          register,
                          errors,
                          id,
                          errorMessage = "Tu dois renseigner ce champ",
                          required = true,
                          isAutoCompleted = false
                      }: Props) => {
    return (
        <div className="space-y-2">
            <input
                type={type}
                placeholder={placeholder}
                className={clsx(
                    isLoading && "cursor-not-allowed",
                    errors[id] ? "placeholder-alert-danger text-alert-danger focus:ring-alert-danger" : "bg-white outline-0 border-b border-gray-500 text-gray p-3"
                )}
                disabled={isLoading}
                {...register(id, {
                    required: {
                        value: required,
                        message: errorMessage
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