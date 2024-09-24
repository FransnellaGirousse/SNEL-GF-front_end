import { Button } from "@/ui/design-system/button/button";
import {Typography} from "@/ui/design-system/typography/typography";
import { LiaExchangeAltSolid } from "react-icons/lia";

export const MissionComponents = () => {
    return(
        <div className="space-y-5 mb-10">
            <Typography
                variant="h5"
                theme="black"
                tag="h5"
            >
                Mission
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
                    <td>28/04/24</td>
                    <td>Norman</td>
                    <td>En Cours</td>
                    <td>Oui</td>
                    <td className="py-3">
                        <Button
                            variant="outline"
                            icon={{icon: LiaExchangeAltSolid}}
                            iconPosition="left"
                        >
                            Modifier
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}