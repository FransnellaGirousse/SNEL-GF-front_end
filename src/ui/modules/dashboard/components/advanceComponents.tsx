import {Typography} from "@/ui/design-system/typography/typography";

export const AdvanceComponents = () => {
    return(
        <div className="space-y-5 mb-10">
            <Typography
                variant="h5"
                theme="black"
                tag="h5"
            >
                Avance
            </Typography>
            <table className="table-fixed w-full">
                <thead className="text-left text-gray border-b border-t border-gray-500">
                <tr>
                    <th className="py-5">Date</th>
                    <th>Nom du missionnaire</th>
                    <th>Etat</th>
                    <th>Etape</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
                <tr>
                    <td className="py-3">28/04/24</td>
                    <td>Norman</td>
                    <td>En Cours</td>
                    <td>Oui</td>
                    <td>Modifier</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}