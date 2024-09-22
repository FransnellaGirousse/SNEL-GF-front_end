import {Container} from "@/src/ui/components/container/container"
import Image from "next/image"
import {Typography} from "@/src/ui/design-system/typography/typography";
import {RiArrowRightLine, RiCheckboxCircleLine} from "react-icons/ri";
import {PropsWithChildren} from "react";
import {Button} from "@/src/ui/design-system/button/button";

export const HighlightListView = () => {
    return (
        <Container className="py-24 space-y-10">
            <div className="flex justify-center gap-24">
                <div className="w-[300px] h-[300px] relative mt-10">
                    <Image
                        fill
                        src="/assets/images/cake.png"
                        alt="Illustration d'un gateau"
                    />
                </div>
                <div className="max-w-md space-y-7">
                    <Typography
                        variant="h3"
                        tag="h2"
                    >
                        De novice à développeur en un clin d'oeil !
                    </Typography>
                    <div className="space-y-3">
                        <ListPoint>
                            Progresser rapidement .
                        </ListPoint>
                        <ListPoint>
                            Inspire toi .
                        </ListPoint>
                        <ListPoint>
                            Gagne de l'inspiration .
                        </ListPoint>
                    </div>
                    <div className="relative">
                        <Button
                            baseUrl="/#"
                            icon={{icon: RiArrowRightLine}}
                            iconPosition="right"
                        >
                            Let's go
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse justify-center gap-24">
                <div className="w-[300px] h-[300px] relative mt-10">
                    <Image
                        fill
                        src="/assets/images/jul a.png"
                        alt="Illustration d'un Toupie"
                    />
                </div>
                <div className="max-w-md space-y-7">
                    <Typography
                        variant="h3"
                        tag="h2"
                    >
                        Booste ta carrière de développeur !
                    </Typography>
                    <div className="space-y-3">
                        <ListPoint>
                            Partage tes projets, obtiens des feedbacks .
                        </ListPoint>
                        <ListPoint>
                            Connecte toi, élargis ton réseau pro .
                        </ListPoint>
                        <ListPoint>
                            Reste inspiré, motivé avec notre communauté .
                        </ListPoint>
                    </div>
                    <div className="relative">
                        <Button
                            variant="secondary"
                            baseUrl="/#"
                            icon={{icon: RiArrowRightLine}}
                            iconPosition="right"
                        >
                            Démarrer
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}


export const ListPoint = ({children}: PropsWithChildren) => {
    return (
        <div className="flex items-start gap-2">
            <RiCheckboxCircleLine
                size={24}
                className="mt-0.5 text-secondary"
            />
            <Typography
                variant="body-lg"
                tag="span"
            >
                {children}
            </Typography>
        </div>
    )
}