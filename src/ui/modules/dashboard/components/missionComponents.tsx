import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdAssignment } from "react-icons/md";


export const MissionComponents = () => {
  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <Typography variant="h5" theme="black" tag="h5">
          <MdAssignment className="inline mr-2" size={48} />
          Mission
        </Typography>
      </div>
      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">Date</th>
            <th>Nom du missionnaire</th>
            <th>TDR</th>
            <th>OM</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          <tr>
            <td>28/04/24</td>
            <td>Missionnaire1</td>
            <td>Oui</td>
            <td>En cours</td>
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
    </div>
  );
};
