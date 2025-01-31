import {Typography} from "@/ui/design-system/typography/typography";
import { FaBeer } from "react-icons/fa";


export const LiquidationComponents = () => {
    return (
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
          <Typography variant="h5" theme="black" tag="h5">
            <FaBeer className="inline mr-2" size={48} />
              Liquidation
          </Typography>
        </div>

        <table className="table-fixed w-full">
          <thead className="text-left text-balck border-b border-t border-midnight-700">
            <tr>
              <th className="py-5">Date</th>
              <th>Nom du missionnaire</th>
              <th>Etat</th>
              <th>Etape</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-left text-midnight-700 border-b border-t border-midnight-700">
            <tr>
              <td className="py-3">28/04/24</td>
              <td>Missionnaire</td>
              <td>En Cours</td>
              <td>Oui</td>
              <td>Modifier</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}