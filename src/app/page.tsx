"use client"

import {Layout} from "@/ui/components/layout/layout";
import {DashboardContainer} from "@/ui/modules/dashboard/dashboard.container";
import { useSession } from "next-auth/react"
import {useRouter} from "next/navigation";
import { setSessionMessage } from '../utils/sessionMessages'

export default function Home() {
  const { data: session } = useSession()
    const router = useRouter()
    const handleRequest = async () => {
        const message = "Vous devez connecter pour accéder à la contenue de cette page !"
        await setSessionMessage(message)
        router.push("/login")
    }
    if (!session) {
        setTimeout(() => {
            handleRequest()
        }, 1000)
    }
  return (
      <Layout>
          {session && <DashboardContainer/>}
      </Layout>
  );
}