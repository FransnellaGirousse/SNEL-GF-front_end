import {Container} from "@/src/ui/components/container/container"
import Image from "next/image"
import {Typography} from "@/src/ui/design-system/typography/typography";
import {Button} from "@/src/ui/design-system/button/button";

export const HeroTopView = () => {
    return (
        <Container className="relative pt-40 overflow-hidden pb-52">
            <div className="w-full max-w-2xl space-y-5">
                <Typography
                    variant="h1"
                    tag="h1"
                    className="max-w-lg"
                >
                    Rejoins les singes Codeurs !
                </Typography>
                <Typography
                    variant="body-lg"
                    tag="p"
                    theme="gray"
                    className="max-w-xl"
                >
                    Ici on se prend pas la tête, mais on code comme des bêtes !
                    Rejoins notre tribu de singes codeurs,
                    partage tes projets les plus fous et fais-toi de nouveaux
                    amis développeurs .
                </Typography>
                <div className="space-x-3.5 pt-2.5">
                    <Button baseUrl="">
                        Commencer
                    </Button>
                    <Button variant="secondary" baseUrl="">
                        En savoir plus
                    </Button>
                </div>
            </div>
            <Image
                src="/assets/images/rocket b.png"
                width={711}
                height={496}
                alt="Illustration d'une fusée pour matérialiser l'évolution du level des developpeurs front-end"
                className="absolute top-0 right-0 z-0"
            />
        </Container>
    )
}
