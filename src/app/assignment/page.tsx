import {Layout} from "@/ui/components/layout/layout";
import {MissionLayout} from "@/ui/components/layout/missionlayout";
import {Button} from "@/ui/design-system/button/button";
import {IoCreateOutline} from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";


export default function Assignment () {
    return (
      <Layout>
        <MissionLayout>
          <div>
            <table className="table-fixed w-full">
              <thead className="text-left text-gray border-b border-t border-gray-500">
                <tr>
                  <th className="py-5">Date de TDR</th>
                  <th>Nom du missionnaire</th>
                  <th>Statut</th>
                  <th>TDR Validé</th>
                  <th>OM Validé</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
                <tr>
                  <td className="py-3">28/04/24</td>
                  <td>Missionnaire 1</td>
                  <td>En Cours</td>
                  <td>Oui</td>
                  <td>Non</td>
                  <td className="py-3">
                    <Button
                      variant="outline"
                      icon={{ icon: LiaExchangeAltSolid }}
                      iconPosition="left"
                    >
                      Modifier
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">09/05/24</td>
                  <td>Missionnaire 2</td>
                  <td>Terminée</td>
                  <td>Oui</td>
                  <td>Non</td>
                  <td className="py-3">
                    <Button
                      variant="outline"
                      icon={{ icon: LiaExchangeAltSolid }}
                      iconPosition="left"
                    >
                      Modifier
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-5">
              <Button
                icon={{ icon: IoCreateOutline }}
                iconPosition="left"
                baseUrl="/assignment/create-tdr"
              >
                Créer une nouvelle mission
              </Button>
            </div>
          </div>
        </MissionLayout>
      </Layout>
    );
}