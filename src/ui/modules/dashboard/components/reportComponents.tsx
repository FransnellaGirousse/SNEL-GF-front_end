import {Typography} from "@/ui/design-system/typography/typography";
import {Button} from "@/ui/design-system/button/button";
import { CgDetailsMore } from "react-icons/cg";
import { IoArchiveOutline } from "react-icons/io5";

export const ReportComponents = () => {
    return(
        <div className="space-y-5 mb-10">
            <Typography
                variant="h5"
                theme="black"
                tag="h5"
            >
                Rapport
            </Typography>
            <table className="table-fixed w-full">
                <thead className="text-left text-gray border-b border-t border-gray-500">
                <tr>
                    <th className="py-5">Date</th>
                    <th>Mission</th>
                    <th>Etat</th>
                    <th>Etape</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
                <tr>
                    <td>28/04/24</td>
                    <td>Mission</td>
                    <td>En Cours</td>
                    <td>Oui</td>
                    <td className="py-3 flex justify-between">
                        <Button
                            variant="outline"
                            icon={{icon: CgDetailsMore}}
                            iconPosition="left"
                        >
                            Détails
                        </Button>
                        <Button
                            variant="ico"
                            icon={{icon: IoArchiveOutline}}
                            iconTheme="danger"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}