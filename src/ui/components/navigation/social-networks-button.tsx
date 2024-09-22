import {footerNetworkLinks} from "@/src/ui/components/navigation/app-links";
import {v4 as uuidv4} from "uuid";
import {Button} from "@/src/ui/design-system/button/button";
import clsx from "clsx";
import {RiFacebookBoxFill} from "react-icons/ri";

interface Props {
    theme?: "gray" | "accent" | "secondary",
    className?: string
}

export const SocialNetworksButtons = ({className, theme = "accent"}: Props) => {
    const icoList = footerNetworkLinks.map((socialNetwork) => (
        <Button
            key={uuidv4()}
            variant="ico"
            iconTheme={theme}
            icon={{icon: socialNetwork.icon ? socialNetwork.icon : RiFacebookBoxFill}}
            baseUrl={socialNetwork.baseUrl}
            linkType={socialNetwork.type}
        />
    ))
    return (
        <div className={clsx(className, "flex items-center gap-2.5")}>{icoList}</div>
    )
}