"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ActiveLink } from "@/ui/components/navigation/active-link";
import { Typography } from "@/ui/design-system/typography/typography";
import {
  MdDashboard,
  MdAssignment,
  MdOutlineRequestPage,
  MdReportGmailerrorred,
} from "react-icons/md";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { RiAccountPinCircleFill } from "react-icons/ri";
import clsx from "clsx";
import { IoPowerSharp } from "react-icons/io5";
import { PiPuzzlePieceBold } from "react-icons/pi";



const userRoles = [
  "user",
  "administrator",
  "director",
  "accountant",
  "visitor",
];

interface Props {
  show: boolean;
}

export const Sidebar = ({ show }: Props) => {
  const { data: session } = useSession();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    // Vérifier si le rôle est stocké dans localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRoles([storedRole]); // Le rôle est supposé être unique
      console.log("Rôle récupéré depuis localStorage : ", storedRole);
    }

    if (session?.user?.role) {
      // Si un rôle est présent dans la session (ex. récupéré via NextAuth)
      localStorage.setItem("userRole", session.user.role); // Stocker le rôle dans localStorage
      setRoles([session.user.role]); // Mettre à jour l'état
    }

    console.log("Détails de la session après connexion :", session?.user.role);
  }, [session]);

  const handleSignOut = () => {
    // Supprimer le rôle du localStorage à la déconnexion
    localStorage.removeItem("userRole");
    signOut(); 
  };

  if (!session) {
    return null; 
  }

  // Fonction de vérification des accès en fonction des rôles
  const canAccess = (requiredRoles: string[]) => {
    return requiredRoles.some((role) => roles.includes(role));
  };

  return (
    <aside
      className={clsx(
        "top-0 fixed bg-white shadow-2xl h-full z-10 transition-all",
        show ? "left-0" : "-left-96"
      )}
    >
      <div className="p-20">
        <Typography
          variant="caption3"
          tag="div"
          className="flex flex-col"
          theme="black"
        >
          {canAccess(["user", "administrator", "accountant", "director"]) && (
            <ActiveLink href="/dashboard">
              <MdDashboard />
              Tableau de bord
            </ActiveLink>
          )}

          {canAccess(["user", "administrator", "accountant"]) && (
            <ActiveLink href="/assignment">
              <MdAssignment />
              Mission
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/purchase_request">
              <PiShoppingCartSimpleLight />
              Demande d'achat
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/request_in_advance">
              <MdOutlineRequestPage />
              Demande d'avance
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/expense">
              <FaDollarSign />
              Dépense
            </ActiveLink>
          )}

          {canAccess(["administrator", "accountant", "director"]) && (
            <ActiveLink href="/approval">
              <FcApproval />
              Approbation
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/mission_report">
              <MdReportGmailerrorred />
              Rapport de mission
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/">
              <PiPuzzlePieceBold />
              Pièce justificative
            </ActiveLink>
          )}

          <hr />

          <Typography
            weight="medium"
            variant="caption3"
            tag="span"
            theme="black"
            className="mt-4"
          >
            Paramètre
          </Typography>

          <ActiveLink href="/account">
            <RiAccountPinCircleFill />
            Mon Compte
          </ActiveLink>
        </Typography>
      </div>

      {/* Container pour déconnecter le bouton */}
      <div className="p-5">
        <button
          onClick={handleSignOut}
          className="flex gap-2 items-center text-gray hover:text-primary transition-all w-full justify-center"
        >
          <IoPowerSharp />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
