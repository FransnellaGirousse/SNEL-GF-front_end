import {Typography} from "@/ui/design-system/typography/typography";

interface Props {
    errors: any,
    id: string
}

export const Select = ({
                           errors,
                           id
                      }: Props) => {
    return (
        <div className="space-y-2">
            <select id="countries"
                    className="p-4 w-full font-white rounded focus:outline-none focus:ring-1 bg-gray-500 text-gray">
                <option selected>Choisir votre rôle</option>
                <option value="user">Utilisateur</option>
                <option value="Ges">Gestionnaire</option>
                <option value="Cmpt">Comptable</option>
                <option value="Dr">Directeur</option>
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