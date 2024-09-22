import {Container} from "@/src/ui/components/container/container"
import Image from "next/image"
import {Logo} from "@/src/ui/design-system/logo/logo";
import {Typography} from "@/src/ui/design-system/typography/typography";
import {Button} from "@/src/ui/design-system/button/button";
import {LinkTypes} from "@/src/lib/link-type";

export const CodersMonkeysSlackView = () => {
    return (
        <Container className="flex justify-between">
            <div className="flex flex-col justify-center max-w-2xl space-y-5">
                <div className="flex items-center gap-2">
                    <Logo size="very-small"/>
                    <Typography
                        variant="caption2"
                        tag="span"
                        weight="medium"
                    >
                        Coders Monkeys
                    </Typography>
                </div>
                <Typography
                    variant="h2"
                    tag="h2"
                >
                    Rejoins nous sur le Slack des Singes codeurs
                </Typography>
                <Typography
                    variant="body-lg"
                    tag="p"
                    theme="gray"
                    className="max-w-lg"
                >
                    Rejoins-nous et obtiens de l'aide, des conseils et pourquoi pas de nouveaux potes !
                </Typography>
                <Button baseUrl="/" linkType={LinkTypes.EXTERNAL}>
                    Rejoindre le groupe d'aide
                </Button>
            </div>
            <div className="relative w-[400px] h-[400px]">
                <Image
                    fill
                    src="/assets/images/slack ico.png"
                    alt="Groupe slack Coders Monkeys"
                />
            </div>
        </Container>
    )
}