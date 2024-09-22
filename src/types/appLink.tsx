import {LinkType} from "@/lib/link-type";
import {IconType} from "react-icons";

export interface AppLinksPropsTypes {
    label: string,
    baseUrl: string,
    type: LinkType,
    icon?: IconType
}

export interface footerLinksPropsTypes {
    label: string,
    links: AppLinksPropsTypes[]
}