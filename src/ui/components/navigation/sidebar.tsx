"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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

// Exemple de rôle pour gérer l'affichage
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
    // Vérifier si la session existe et si l'email est disponible
    if (session?.user?.email) {
      // console.log("Email récupéré : ", session.user.email); // Affichage de l'email dans la console
      // Fonction pour récupérer les rôles à partir de votre API Laravel
      const fetchRoles = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/api/check-and-add-user",
            {
              method: "POST",
              body: JSON.stringify({ email: session.user.email }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setRoles(data.roles); // Assurez-vous que "roles" est retourné par l'API
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des rôles", error);
        }
      };

      // Appeler la fonction si la session est disponible
      fetchRoles();
    }
  }, [session]);

  if (!session) {
    return null; // Si la session n'existe pas, ne rien afficher
  }

  const role = session.user?.role;
  // Conditionner les liens selon le rôle
  const canAccessMission =
    roles.includes("user") ||
    roles.includes("administrator") ||
    roles.includes("director") ||
    roles.includes("accountant");
  const canAccessApproval =
    roles.includes("administrator") ||
    roles.includes("accountant") ||
    roles.includes("director");
  const canAccesDashboard =
    roles.includes("user") ||
    roles.includes("administrator") ||
    roles.includes("accountant") ||
    roles.includes("director");
  const canAccessPurchaseRequest = roles.includes("user");

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
          {canAccesDashboard && (
            <ActiveLink href="/dashboard">
              <MdDashboard />
              Tableau de bord
            </ActiveLink>
          )}

          {/* Mission, accessible par les utilisateurs et les admins */}
          {canAccessMission && (
            <ActiveLink href="/assignment">
              <MdAssignment />
              Mission
            </ActiveLink>
          )}

          {/* Demande d'achat (accessible à tous) */}
          {canAccessPurchaseRequest && (
            <ActiveLink href="/purchase_request">
              <PiShoppingCartSimpleLight />
              Demande d'achat
            </ActiveLink>
          )}

          {/* Demande d'avance */}
          <ActiveLink href="/request_in_advance">
            <MdOutlineRequestPage />
            Demande d'avance
          </ActiveLink>

          {/* Dépense */}
          <ActiveLink href="/expense">
            <FaDollarSign />
            Dépense
          </ActiveLink>

          {/* Approbation (accessible uniquement à l'admin, comptable, et directeur) */}
          {canAccessApproval && (
            <ActiveLink href="/approval">
              <FcApproval />
              Approbation
            </ActiveLink>
          )}

          {/* Rapport de mission */}
          <ActiveLink href="/mission_report">
            <MdReportGmailerrorred />
            Rapport de mission
          </ActiveLink>

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

          {/* Mon compte */}
          <ActiveLink href="/account">
            <RiAccountPinCircleFill />
            Mon Compte
          </ActiveLink>
        </Typography>
      </div>
    </aside>
  );
};
