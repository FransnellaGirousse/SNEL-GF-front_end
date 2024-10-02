import {Container} from "@/ui/components/container/container"
import {Box} from "@/ui/design-system/box/box";
import {Typography} from "@/ui/design-system/typography/typography";
import Link from "next/link";
import {RegisterForm} from "@/ui/modules/authentication/register/register.form";
import {FormsType} from "@/types/forms";

interface Props {
    form: FormsType
}

export const RegisterView = ({form}: Props) => {
    return (
        <Container className="flex items-center justify-center mt-10 mb-32">
            <div>
                <Box padding_y="py-5">
                    <div className="flex items-center justify-between mb-10">
                        <Typography
                            variant="h5"
                            tag="h1"
                            theme="black"
                        >
                            Inscription
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Typography
                                variant="caption4"
                                tag="h2"
                                theme="black"
                            >
                                Tu as déjà un compte ?
                            </Typography>
                            <Typography
                                variant="caption4"
                                tag="span"
                                theme="primary"
                            >
                                <Link href="/connexion" className="hover:underline transition-all">Connexion</Link>
                            </Typography>
                        </div>
                    </div>
                    <RegisterForm form={form}/>
                </Box>
            </div>
        </Container>
    )
}