"use client"

import { Layout } from "@/ui/components/layout/layout";
import {LoginContainer} from "@/ui/modules/authentication/login/login.container";
import {useEffect} from "react";
import {clearSessionMessage, getSessionMessage, setSessionMessage} from "@/utils/sessionMessages";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Login () {
    useEffect(() => {
        const fetchMessage = async () => {
            const message = await getSessionMessage()
            if (message) {
                toast.warning(message) // Show the session message
                await clearSessionMessage() // Clear the message after showing it
            }
        };
        fetchMessage()
    }, [])
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
            {!session && <LoginContainer/>}
        </Layout>
    )
}