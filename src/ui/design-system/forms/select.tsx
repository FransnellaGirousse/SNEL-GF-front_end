import {Typography} from "@/ui/design-system/typography/typography";
import {v4 as uuidv4} from "uuid";

interface Props {
    errors: any,
    id: string
    selectOptions: string[],
    register: any,
    isLoading: any
}

export const Select = ({
                           errors,
                           register,
                           isLoading,
                           id,
                           selectOptions
                      }: Props) => {
    return (
        <div className="space-y-2">
            <select id={id}
                    className="p-4 w-full font-white rounded focus:outline-none focus:ring-1 bg-gray-500 text-gray" defaultValue={selectOptions[0]}
                    disabled={isLoading}
                    {...register(id, {
                        validate: (value: string) => {
                            const verificationValue = selectOptions.includes(value)
                            if (!verificationValue || value === selectOptions[0]) {
                                return `Veuillez choisir le bon ${id}`
                            }
                        }
                    })}
            >
                {selectOptions.map((option) => {
                    return <>
                        <option key={uuidv4()} defaultValue={option}>{option}</option>
                    </>

                })}
            </select>
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