"use client";

import { MissionComponents } from "@/ui/modules/dashboard/components/missionComponents";
import { AdvanceComponents } from "@/ui/modules/dashboard/components/advanceComponents";
import { PurchaseComponents } from "@/ui/modules/dashboard/components/purchaseComponents";
import { LiquidationComponents } from "@/ui/modules/dashboard/components/liquidationComponents";
import { ReportComponents } from "@/ui/modules/dashboard/components/reportComponents";
import { ExpenseComponent } from "./components/expenseComponent";
import { MdAssignment } from "react-icons/md";
import { MdOutlineRequestPage } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { FaBeer } from "react-icons/fa";
import { useRef, useState } from "react";

export const DashboardView = () => {
  const [activeComponent, setActiveComponent] = useState();
  const componentRef = useRef<HTMLDivElement>(null);
  const handleClick = (component) => {
    if (activeComponent !== component) {
      setActiveComponent(component);
      setTimeout(() => {
        componentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };
  console.log(activeComponent);
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <div
          className="bg-primary-600 flex gap-5 p-5 rounded cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleClick(<MissionComponents />)}
        >
          <div className="w-1/3 flex flex-wrap justify-center">
            <MdAssignment className="text-white w-14 h-14" />
            <div className="text-center">
              <span className="uppercase text-sm text-gray-500 text-caption4">
                Approuvés
              </span>
              <br />
              <span className="text-2xl text-white">22</span>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div>
              <span className="text-gray-500 text-caption4">MISSIONS</span>
              <br />
              <span className="text-2xl text-white">4000</span>
            </div>
            <div className="absolute right-0 bottom-0">
              <span className="text-gray-500 text-caption4">
                Dernières Missions
              </span>
              <br />
              <span className="text-white">19 Mars 2025</span>
            </div>
          </div>
        </div>
        <div
          className="bg-alert-danger flex gap-5 p-5 rounded cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleClick(<ExpenseComponent />)}
        >
          <div className="w-1/3 flex flex-wrap justify-center">
            <MdAttachMoney className="text-white w-14 h-14" />
            <div className="text-center">
              <span className="uppercase text-sm text-gray-500 text-caption4">
                Approuvés
              </span>
              <br />
              <span className="text-2xl text-white">22</span>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div>
              <span className="text-gray-500 text-caption4">DEPENSES</span>
              <br />
              <span className="text-2xl text-white">2000</span>
            </div>
            <div className="absolute right-0 bottom-0">
              <span className="text-gray-500 text-caption4">
                Dernières dépenses
              </span>
              <br />
              <span className="text-white">19 Mars 2025</span>
            </div>
          </div>
        </div>
        <div
          className="bg-purple flex gap-5 p-5 rounded cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleClick(<ReportComponents />)}
        >
          <div className="w-1/3 flex flex-wrap justify-center">
            <MdReportGmailerrorred className="text-white w-14 h-14" />
            <div className="text-center">
              <span className="uppercase text-sm text-caption4 text-gray-500">
                Approuvés
              </span>
              <br />
              <span className="text-2xl text-white">111</span>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div>
              <span className="text-gray-500 text-caption4 uppercase">
                Rapports de missions
              </span>
              <br />
              <span className="text-2xl text-white">1000</span>
            </div>
            <div className="absolute right-0 bottom-0">
              <span className="text-gray-500 text-caption4">
                Dernier rapport
              </span>
              <br />
              <span className="text-white">19 Mars 2025</span>
            </div>
          </div>
        </div>
        <div
          className="bg-pink flex gap-5 p-5 rounded cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleClick(<AdvanceComponents />)}
        >
          <div className="w-1/3 flex flex-wrap justify-center">
            <MdOutlineRequestPage className="text-white w-14 h-14" />
            <div className="text-center">
              <span className="uppercase text-sm text-caption4 text-gray-500">
                Approuvés
              </span>
              <br />
              <span className="text-2xl text-white">333</span>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div>
              <span className="text-gray-500 text-caption4 uppercase">
                Listes des Avances
              </span>
              <br />
              <span className="text-2xl text-white">3000</span>
            </div>
            <div className="absolute right-0 bottom-0">
              <span className="text-gray-500 text-caption4">
                Derniers avances
              </span>
              <br />
              <span className="text-white">19 Mars 2025</span>
            </div>
          </div>
        </div>

        <div
          className="bg-secondary-600 flex gap-5 p-5 rounded cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleClick(<PurchaseComponents />)}
        >
          <div className="w-1/3 flex flex-wrap justify-center">
            <PiShoppingCartSimpleLight className="text-white w-14 h-14" />
            <div className="text-center">
              <span className="uppercase text-sm text-caption4 text-gray-500">
                Approuvés
              </span>
              <br />
              <span className="text-2xl text-white">444</span>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div>
              <span className="text-gray-500 text-caption4 uppercase">
                Listes des Achats
              </span>
              <br />
              <span className="text-2xl text-white">4000</span>
            </div>
            <div className="absolute right-0 bottom-0">
              <span className="text-gray-500 text-caption4">
                Derniers avances
              </span>
              <br />
              <span className="text-white">19 Mars 2025</span>
            </div>
          </div>
        </div>

        <div
          className="bg-gray-800 flex gap-5 p-5 rounded cursor-pointer hover:shadow-xl transition-all"
          onClick={() => handleClick(<LiquidationComponents />)}
        >
          <div className="w-1/3 flex flex-wrap justify-center">
            <FaBeer className="text-white w-14 h-14" />
            <div className="text-center">
              <span className="uppercase text-sm text-caption4 text-gray-500">
                Approuvés
              </span>
              <br />
              <span className="text-2xl text-white">555</span>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div>
              <span className="text-gray-500 text-caption4 uppercase">
                Liquidation
              </span>
              <br />
              <span className="text-2xl text-white">5000</span>
            </div>
            <div className="absolute right-0 bottom-0">
              <span className="text-gray-500 text-caption4">
                Derniers avances
              </span>
              <br />
              <span className="text-white">19 Mars 2025</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10" ref={componentRef}>
        {activeComponent}
      </div>
    </>
  );
};
