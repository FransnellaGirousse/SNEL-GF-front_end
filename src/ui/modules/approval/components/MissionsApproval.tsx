import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdAssignment } from "react-icons/md";

export const MissionApproval = () => {
  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <Typography variant="h5" theme="black" tag="h5">
          <MdAssignment className="inline mr-2" size={48} />
          Liste des Approbations Missions
        </Typography>
      </div>
      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">Date de demande</th>
            <th>Nom de l'employé</th>
            <th>Etat de l'approbation</th>
            <th>Commentaires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          {/* Exemple d'une ligne d'approbation */}
          <tr>
            <td>28/04/24</td>
            <td>Norman</td>
            <td>En attente</td>
            <td>Examen de la demande</td>
            <td className="py-3">
              <Button
                variant="outline"
                icon={{ icon: LiaExchangeAltSolid }}
                iconPosition="left"
              >
                Approuver
              </Button>
            </td>
          </tr>

          {/* Exemple d'une autre ligne d'approbation */}
          <tr>
            <td>27/04/24</td>
            <td>Paul</td>
            <td>Approuvé</td>
            <td>Tout est conforme</td>
            <td className="py-3">
              <Button
                variant="outline"
                icon={{ icon: LiaExchangeAltSolid }}
                iconPosition="left"
              >
                Détails
              </Button>
            </td>
          </tr>

          {/* Une autre demande en attente */}
          <tr>
            <td>26/04/24</td>
            <td>Sarah</td>
            <td>En attente</td>
            <td>Demande en cours de validation</td>
            <td className="py-3">
              <Button
                variant="outline"
                icon={{ icon: LiaExchangeAltSolid }}
                iconPosition="left"
              >
                Approuver
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
