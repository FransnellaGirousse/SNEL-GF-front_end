import {
  FaWallet,
  FaChartLine,
  FaRocket,
  FaFileAlt,
  FaTools,
} from "react-icons/fa";

export const FinancialManagementAnimation = () => {
  const icons = [
    { Icon: FaWallet, label: "Portefeuille" },
    { Icon: FaChartLine, label: "Graphique" },
    { Icon: FaRocket, label: "Lancement" },
    { Icon: FaFileAlt, label: "Documents" },
    { Icon: FaTools, label: "Outils" },
  ];

  return (
    <div className="flex justify-between items-center gap-8 mt-10">
      {icons.map(({ Icon, label }, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-black p-4">
            <Icon className="text-4xl" />
          </div>

          <p className="mt-2 text-sm text-gray-700">{label}</p>
        </div>
      ))}
    </div>
  );
};
