import Image from "next/image"
import {Container} from "@/src/ui/components/container/container"
import {Typography} from "@/src/ui/design-system/typography/typography";
import {ActiveLink} from "@/src/ui/components/navigation/active-link";
import {v4 as uuidv4} from "uuid";
import {footerLinks} from "@/src/ui/components/navigation/app-links";
import {footerLinksPropsTypes} from "@/src/types/appLink"
import {LinkTypes} from "@/src/lib/link-type";
import {SocialNetworksButtons} from "@/src/ui/components/navigation/social-networks-button";

export const Footer = () => {
    const currentYear = new Date().getFullYear()
    const footerNavigationList = footerLinks.map((columnLinks) => (
        <FooterLink key={uuidv4()} data={columnLinks}/>
    ))
    return (
        <div className="bg-gray">
            <Container className="flex justify-between pt-16">
                <div className="flex flex-col items-center gap-1">
                    <Typography
                        variant="caption1"
                        theme="white"
                        weight="medium"
                    >
                        Formations gratuites
                    </Typography>
                    <Typography
                        variant="caption3"
                        theme="gray"
                    >
                        Abonne-toi à la chaîne
                    </Typography>
                    <a href="#/" target="_blank">
                        <Image
                            src="/assets/svg/Ellipse.svg"
                            width={229}
                            height={229}
                            alt="Remote Monkey | Youtube"
                        />
                    </a>
                </div>
                <div className="flex gap-7">
                    {footerNavigationList}
                </div>
            </Container>
            <Container className="pt-9 pb-11 space-y-11">
                <hr className="text-gray-400"/>
                <div className="flex items-center justify-between">
                    <Typography
                        variant="caption4"
                        theme="gray"
                    >
                        Copyright {currentYear} | Propulsed by&nbsp;
                        <a href="http://arnaud-desportes.com/" target="_blank" className="underline">
                            Arnaud Desportes
                        </a>
                        &nbsp;- Remote Monkey SASU
                    </Typography>
                    <div className="">
                        <SocialNetworksButtons theme="gray"/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

interface footerLinkProps {
    data: footerLinksPropsTypes
}

function FooterLink({data}: footerLinkProps) {
    const linkLists = data.links.map((link) => (
        <div key={uuidv4()}>
            {
                link.type === LinkTypes.INTERNAL
                && <ActiveLink href={link.baseUrl}>{link.label}</ActiveLink>
            }
            {
                link.type === LinkTypes.EXTERNAL
                && <a href={link.baseUrl} target="_blank">{link.label}</a>
            }
        </div>
    ))
    return (
        <div className="min-w-[190px]">
            <Typography
                variant="caption2"
                theme="white"
                weight="medium"
                className="pb-5"
            >
                {data.label}
            </Typography>
            <Typography
                variant="caption3"
                theme="gray"
                className="space-y-4"
            >
                {linkLists}
            </Typography>
        </div>
    )
}