import { FormsType } from "@/types/forms";
import { useState } from "react";

interface Props {
  form: FormsType;
}


export const FinanceExpense = () => {
  // État pour chaque colonne pour gérer les totaux
  const [columns, setColumns] = useState({
    travelTempDuty: "",
    travelLocal: "",
    faxInternetTelephone: "",
    officeSupplies: "",
    postageShipping: "",
    printing: "",
    otherAccount: "",
    otherAmount: "",
  });

  const handleInputChange = (columnKey: string, value: string) => {
    setColumns({ ...columns, [columnKey]: value });
  };

  const calculateTotal = () => {
    // Calcul de la somme totale
    return Object.values(columns)
      .map((value) => parseFloat(value) || 0)
      .reduce((acc, current) => acc + current, 0);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg font-bold text-center mb-4">
        FOR FINANCE OFFICE USE ONLY
      </h2>
      <table className="table-auto border-collapse w-full border border-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 p-2">
              540003 TRAVEL TEMP DUTY
            </th>
            <th className="border border-gray-400 p-2">540004 TRAVEL LOCAL</th>
            <th className="border border-gray-400 p-2">
              551000 FAX, INTERNET TELEPHONE
            </th>
            <th className="border border-gray-400 p-2">
              551500 OFFICE SUPPLIES
            </th>
            <th className="border border-gray-400 p-2">
              552500 POSTAGE SHIPPING
            </th>
            <th className="border border-gray-400 p-2">552000 PRINTING</th>
            <th className="border border-gray-400 p-2">OTHER ACCOUNT</th>
            <th className="border border-gray-400 p-2">OTHER AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.travelTempDuty}
                onChange={(e) =>
                  handleInputChange("travelTempDuty", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.travelLocal}
                onChange={(e) =>
                  handleInputChange("travelLocal", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.faxInternetTelephone}
                onChange={(e) =>
                  handleInputChange("faxInternetTelephone", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.officeSupplies}
                onChange={(e) =>
                  handleInputChange("officeSupplies", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.postageShipping}
                onChange={(e) =>
                  handleInputChange("postageShipping", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.printing}
                onChange={(e) => handleInputChange("printing", e.target.value)}
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.otherAccount}
                onChange={(e) =>
                  handleInputChange("otherAccount", e.target.value)
                }
              />
            </td>
            <td className="border border-gray-400">
              <input
                type="number"
                className="w-full p-2 border-none"
                value={columns.otherAmount}
                onChange={(e) =>
                  handleInputChange("otherAmount", e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={8} className="border border-gray-400 text-center p-2">
              Total : {calculateTotal()} MGA
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
