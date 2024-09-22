import {ActiveLink} from "@/ui/components/navigation/active-link";
import {Typography} from "@/ui/design-system/typography/typography";
import { MdDashboard } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { MdOutlineRequestPage } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { MdReportGmailerrorred } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import clsx from "clsx";

interface Props {
    show: boolean
}

export const Sidebar = ({show}: Props) => {
    return(
        <aside className={clsx("absolute top-0 bg-midnight shadow-2xl h-full z-10 transition-all", show ? "left-0" : "-left-96")}>
           <div className="p-20">
               <Typography
                   variant="caption3"
                   tag="div"
                   className="flex flex-col"
               >
                   <ActiveLink
                       href="/"
                   >
                       <MdDashboard />Tableau de bord
                   </ActiveLink>
                   <ActiveLink href="/assignment">
                       <MdAssignment />Mission
                   </ActiveLink>
                   <ActiveLink href="/formations">
                       <PiShoppingCartSimpleLight />Demande d'achat
                   </ActiveLink>
                   <ActiveLink href="/request_in_advance">
                       <MdOutlineRequestPage />Demande d'avance
                   </ActiveLink>
                   <ActiveLink href="/contact">
                       <FaDollarSign />Dépense
                   </ActiveLink>
                   <ActiveLink href="/contact">
                       <FcApproval />Approbation
                   </ActiveLink>
                   <ActiveLink href="/contact">
                       <MdReportGmailerrorred />Rapport de mission
                   </ActiveLink>
                   <hr/>
                   <ActiveLink href="/contact">
                       <RiAccountPinCircleFill />Mon Compte
                   </ActiveLink>
               </Typography>
           </div>
        </aside>
    )
}