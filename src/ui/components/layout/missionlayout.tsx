import {Container} from "@/ui/components/container/container";
import {PropsWithChildren} from "react";
import {Typography} from "@/ui/design-system/typography/typography";
import {ActiveLink} from "@/ui/components/navigation/active-link";
import {MdAssignment} from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { TbMenuOrder } from "react-icons/tb";

export const MissionLayout = ({children}: PropsWithChildren) => {
    return (
        <Container className="flex mt-10 gap-6">
            <aside className="aside flex-none">
                <div className="space-y-2">
                    <input
                        type="text"
                        className="p-3 w-full border border-midnight-600 font-white rounded focus:outline-none focus:ring-1 bg-midnight-700 text-white"
                        placeholder="Rechercher par destination"
                    />
                    <select id="countries"
                            className="p-4 w-full border border-midnight-600 font-white rounded focus:outline-none focus:ring-1 bg-midnight-700 text-white">
                        <option selected>Choisir votre rôle</option>
                        <option value="user">Utilisateur</option>
                        <option value="Ges">Gestionnaire</option>
                        <option value="Cmpt">Comptable</option>
                        <option value="Dr">Directeur</option>
                    </select>
                <Typography
                    variant="caption3"
                    tag="div"
                    className="flex flex-col"
                >
                    <ActiveLink href="/assignment">
                        <MdAssignment />Tableau de bord des missions
                    </ActiveLink>
                    <ActiveLink href="/assignment/create-tdr">
                        <IoCreateOutline />Créer une nouvelle mission (TDR)
                    </ActiveLink>
                    <ActiveLink href="/assignment/create-om">
                        <TbMenuOrder />Créer un autre ordre de mission (OM)
                    </ActiveLink>
                </Typography>
                </div>
            </aside>
            <main className="w-full">
                {children}
            </main>
        </Container>
    )
}