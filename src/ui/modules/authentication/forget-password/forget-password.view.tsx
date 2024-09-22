import {Container} from "@/src/ui/components/container/container"
import Image from "next/image";
import {Box} from "@/src/ui/design-system/box/box";
import {Typography} from "@/src/ui/design-system/typography/typography";
import Link from "next/link";

export const ForgetPasswordView = () => {
    return (
        <Container className="grid grid-cols-2 gap-20 mb-32">
            <div>
                <div className="relative flex items-center">
                    <Image
                        width={531}
                        height={531}
                        src="/assets/images/Scene 11.png"
                        alt="Description de l'illustration ..."
                    />
                </div>
            </div>
            <div className="flex items-center">
                <Box padding_y="py-5">
                    <div className="flex items-center justify-between">
                        <Typography
                            variant="h5"
                            tag="h1"
                        >
                            Mot de passe oublié
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Typography
                                variant="caption4"
                                tag="h2"
                                theme="gray"
                            >
                                Tu n'as pas de compte ?
                            </Typography>
                            <Typography
                                variant="caption4"
                                tag="span"
                                theme="primary"
                            >
                                <Link href="/inscription">S'Inscrire</Link>
                            </Typography>
                        </div>
                    </div>
                </Box>
            </div>
        </Container>
    )
}