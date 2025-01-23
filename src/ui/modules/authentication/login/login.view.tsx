import {Container} from "@/ui/components/container/container"
import Image from "next/image";
import {Box} from "@/ui/design-system/box/box";
import {Typography} from "@/ui/design-system/typography/typography";
import Link from "next/link";
import {LoginForm} from "@/ui/modules/authentication/login/login.form";
import {FormsType} from "@/types/forms";
import { IoLogoGoogle } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import {Button} from "@/ui/design-system/button/button";
import { signIn } from "next-auth/react"

interface Props {
    form: FormsType
}

export const LoginView = ({form}: Props) => {
    return (
      <Container className="flex justify-center items-center gap-5 mt-10 mb-32">
        <div className="w-[531px] flex-none max-lg:hidden">
          <div className="relative flex items-center">
            <Image
              width={531}
              height={531}
              src="/assets/images/authentication/login.image.svg"
              alt="Login Image ..."
            />
          </div>
        </div>
        <div className="w-full max-lg:w-[450px]">
          <Box padding_y="py-5">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h5" tag="h1" theme="black">
                  Connexion
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography variant="caption4" tag="h2" theme="black">
                  Tu n'as pas de compte ?
                </Typography>
                <Typography variant="caption4" tag="span" theme="primary">
                  <Link
                    href="/register"
                    className="hover:text-primary-600 transition-all hover:underline"
                  >
                    S'Inscrire
                  </Link>
                </Typography>
              </div>
            </div>
            <LoginForm form={form} />
            <Typography variant="caption2" tag="h4" theme="black">
              Continuer avec :
            </Typography>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                className="bg-alert-danger hover:bg-alert-danger/50 text-white rounded-full flex items-center justify-center w-[50px] h-[50px] transition-all text-2xl"
                onClick={() => signIn("google")}
              >
                <IoLogoGoogle />
              </button>
              <Button
                variant="ico"
                baseUrl="http://web.facebook.com/"
                icon={{ icon: FaFacebook }}
                iconTheme="accent"
              />
            </div>
          </Box>
        </div>
      </Container>
    );
}