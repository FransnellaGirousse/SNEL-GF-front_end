import {FormsType} from "@/types/forms";
import Select from 'react-select'
import {Typography} from "@/ui/design-system/typography/typography";
import {Controller} from "react-hook-form";

interface Props {
    form: FormsType
}

export const RoleRegisterForm = ({form}: Props) => {
    const {errors, control} = form
    const options = [
        { value: 'user', label: 'Utilisateur' },
        { value: 'administrator', label: 'Gestionnaire' },
        { value: 'accountant', label: 'Comptable' },
        { value: 'director', label: 'Directeur' },
        { value: 'visitor', label: 'Visiteur' }
    ]
    const arr:string[] = []
    options.map((option) => {
        arr.push(option.value)
    })
    return(
        <>
            <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#E5E5E5",
                                borderColor: state.isFocused ? "#E5E5E5" : "#E5E5E5",
                                hover: "none"
                            }),
                        }}
                        className="p-3 w-full font-white rounded focus:outline-none focus:ring-1 bg-gray-500 text-gray"
                        options={options}
                        value={options.find((c) => c.value === value)}
                        onChange={(val) => onChange(val?.value)}
                    />
                )}
                rules={
                    {
                        required: true,
                        validate: (value: string) => {
                            const verificationValue = arr.includes(value)
                            if (!verificationValue) {
                                return "Veuillez choisir le bon rôle"
                            }
                        }
                    }
                }
            />
            {errors["role"] &&
		        <Typography
			        variant="caption4"
			        tag="div"
			        theme="danger"
		        >
                    {errors["role"]?.message}
		        </Typography>
            }
        </>
    )
}