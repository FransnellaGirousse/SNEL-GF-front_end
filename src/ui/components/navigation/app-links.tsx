import {AppLinksPropsTypes} from "@/types/appLink";
import {RiLinkedinFill, RiSlackFill, RiYoutubeFill} from "react-icons/ri";

const footerApplicationLinks: AppLinksPropsTypes[] = [
    {
        label: "Accueil",
        baseUrl: "/",
        type: "internal"
    },
    {
        label: "Projets",
        baseUrl: "/projets",
        type: "internal"
    },
    {
        label: "Formations",
        baseUrl: "https://youtube.com/@remotemonkey",
        type: "external"
    },
    {
        label: "Coders Monkeys",
        baseUrl: "/contact",
        type: "internal"
    }
]
const footerUsersLinks: AppLinksPropsTypes[] = [
    {
        label: "Mon Espace",
        baseUrl: "/#",
        type: "internal"
    },
    {
        label: "Connexion",
        baseUrl: "/#",
        type: "internal"
    },
    {
        label: "Inscription",
        baseUrl: "/#",
        type: "external"
    },
    {
        label: "Mot de passe oublié",
        baseUrl: "/#",
        type: "internal"
    }
]
const footerInformationLinks: AppLinksPropsTypes[] = [
    {
        label: "CGU",
        baseUrl: "/#",
        type: "internal"
    },
    {
        label: "Confidentialité",
        baseUrl: "/#",
        type: "internal"
    },
    {
        label: "A propos",
        baseUrl: "/#",
        type: "internal"
    },
    {
        label: "Contact",
        baseUrl: "/#",
        type: "internal"
    }
]
export const footerNetworkLinks: AppLinksPropsTypes[] = [
    {
        label: "Youtube",
        baseUrl: "https://youtube.com",
        type: "external",
        icon: RiYoutubeFill
    },
    {
        label: "Linkedin",
        baseUrl: "https://linkedin.com/",
        type: "external",
        icon: RiLinkedinFill
    },
    {
        label: "Slack",
        baseUrl: "https://slack.com/",
        type: "external",
        icon: RiSlackFill
    }
]

export const footerLinks = [
    {
        label: "App",
        links: footerApplicationLinks
    },
    {
        label: "Utilisateurs",
        links: footerUsersLinks
    },
    {
        label: "Informations",
        links: footerInformationLinks
    },
    {
        label: "Réseaux Sociaux",
        links: footerNetworkLinks
    },
]