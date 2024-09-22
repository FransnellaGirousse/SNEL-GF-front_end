import {Layout} from "@/ui/components/layout/layout";
import {Container} from "@/ui/components/container/container";
import {Typography} from "@/ui/design-system/typography/typography";
import {PurchaseRequestContainer} from "@/ui/modules/purchaseRequest/purchaseRequest.container";

export default function Purchase_Request () {
    return(
        <Layout>
            <Container className="mt-10">
                <div className="flex justify-center">
                    <div className="border-2 border-midnight-700 flex-none w-[800px] rounded p-10 relative">
                        <Typography
                            variant="h5"
                            theme="white"
                            tag="h5"
                        >
                            Demande d'achat
                        </Typography>
                        <PurchaseRequestContainer/>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}