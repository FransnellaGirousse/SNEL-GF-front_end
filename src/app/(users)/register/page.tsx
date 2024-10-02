"use client"

import {Layout} from "@/ui/components/layout/layout";
import {RegisterContainer} from "@/ui/modules/authentication/register/register.container";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {setSessionMessage} from "@/utils/sessionMessages";

export default function Login () {
    const { data: session } = useSession()
    const router = useRouter()
    const handleRequest = async () => {
        const message = "Vous devez connecter pour accéder à la contenue de cette page !"
        await setSessionMessage(message)
        router.push("/")
    }
    if (session) {
        setTimeout(() => {
            handleRequest()
        }, 500)
    }
    return(
        <Layout>
            {!session && <RegisterContainer/>}
        </Layout>
    )
}