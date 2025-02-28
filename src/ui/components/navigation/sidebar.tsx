"use client";

import { useRef, useEffect } from "react";
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
import { FcApprove } from "react-icons/fc";
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";

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

const CheckAndAddUser = async (email, setUser) => {
  try {
    const res = await fetch("http://localhost:8000/api/check-and-add-user", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
    }
  } catch (e) {
    console.error(e);
  }
};

export const Sidebar = ({ show }: Props) => {
  const { data: session } = useSession();
  const prevEmailRef = useRef(null);
  const { user, setUser } = useStore();
  const router = useRouter();

  const roles = [];
  if (user.role) {
    roles.push(user.role);
  }

  const CheckUser = async () => {
    try {
      await CheckAndAddUser(session?.user.email, setUser);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (session?.user.email && session?.user.email !== prevEmailRef.current) {
      CheckUser();
      prevEmailRef.current = session?.user.email;
    }
  }, [session?.user.email]);
  useEffect(() => {
    if (Object.keys(user).length > 0 && user.role === "visiteur") {
      router.push("/account");
    }
  }, [user]);
  if (!session) return null;

  const handleSignOut = () => {
    signOut();
  };

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

          {canAccess(["user"]) && (
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

          {canAccess(["administrator"]) && (
            <ActiveLink href="/approval-missions">
              <FcApprove />
              Approbation Mission
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/mission_report">
              <MdReportGmailerrorred />
              Rapport de mission
            </ActiveLink>
          )}

          {canAccess(["user"]) && (
            <ActiveLink href="/supporting">
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
