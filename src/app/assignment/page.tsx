import {Layout} from "@/ui/components/layout/layout";
import {MissionLayout} from "@/ui/components/layout/missionlayout";
import {Button} from "@/ui/design-system/button/button";
import {IoCreateOutline} from "react-icons/io5";

export default function Assignment () {
    return(
        <Layout>
            <MissionLayout>
                <div>
                    <table className="table-fixed w-full">
                        <thead className="text-left text-white border-b border-t border-midnight-700">
                            <tr>
                                <th className="py-5">Date de début</th>
                                <th>Destination</th>
                                <th>Statut</th>
                                <th>TDR Validé</th>
                                <th>OM Validé</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-left text-midnight-700 border-b border-t border-midnight-700">
                            <tr>
                                <td className="py-3">28/04/24</td>
                                <td>Mahajanga</td>
                                <td>En Cours</td>
                                <td>Oui</td>
                                <td>Non</td>
                            </tr>
                            <tr>
                                <td className="py-3">09/05/24</td>
                                <td>Ambondromamy</td>
                                <td>Terminée</td>
                                <td>Oui</td>
                                <td>Non</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-5">
                        <Button
                            icon={{icon: IoCreateOutline}}
                            iconPosition="left"
                            baseUrl="/assignment/create-tdr"
                        >
                            Créer une nouvelle mission
                        </Button>
                    </div>
                </div>
            </MissionLayout>
        </Layout>
    )
}