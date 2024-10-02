"use client"

import {Layout} from "@/ui/components/layout/layout";
import {Container} from "@/ui/components/container/container";
import {MissionReportContainer} from "@/ui/modules/missionReport/missionReport.container";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {setSessionMessage} from "@/utils/sessionMessages";

export default function MissionReport () {
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
    return(
        <Layout>
            {session &&
	            <Container className="mt-10">
		            <div className="flex justify-center">
			            <div className="border-2 border-gray-400 flex-none max-sm:w-full max-lg:w-[600px] w-[1000px] rounded p-10 relative">
				            <MissionReportContainer/>
			            </div>
		            </div>
	            </Container>
            }
        </Layout>
    )
}