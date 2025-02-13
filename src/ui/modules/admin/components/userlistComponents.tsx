import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { MdDetails } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";


export const UserListComponents = () => {
  return (
    <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
      <div className="space-y-5 mb-10 border border-gray-500 p-10 rounded">
        <Typography variant="h5" theme="black" tag="h5">
          <FaListUl className="inline mr-2" size={30} />
          Listes des utilisateurs
        </Typography>
      </div>
      <table className="table-fixed w-full">
        <thead className="text-left text-gray border-b border-t border-gray-500">
          <tr>
            <th className="py-5">ID</th>
            <th>Date de creation</th>
            <th>Existence</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-left text-midnight-700 border-b border-t border-gray-500">
          <tr>
            <td>16</td>
            <td>12/02/2025</td>
            <td>1jours</td>
            <td>Rakoto</td>
            <td>rakoto@gmail.com</td>
            <td>Directeur</td>
            <td className="py-3">
              <Button
                variant="outline"
                icon={{ icon: MdDetails }}
                iconPosition="left"
              ></Button>
              <Button
                variant="outline"
                icon={{ icon: TiUserDelete }}
                iconPosition="right"
              ></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
