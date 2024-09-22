"use client"

import {Typography} from "@/ui/design-system/typography/typography";
import clsx from "clsx";

interface Props {
    currentStepIndex: number
}

export const Step = ({currentStepIndex}: Props) => {
    return(
        <>
            <div className={clsx(currentStepIndex >= 1 ? "border-primary" : "border-midnight-700" , "space-y-3 border-t-2 py-3")}>
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="primary"
                >
                    Etape 1
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                >
                    Informations de la demande
                </Typography>
            </div>
            <div className={clsx(currentStepIndex >= 2 ? "border-primary" : "border-midnight-700", "space-y-3 border-t-2 py-3")}>
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="primary"
                >
                    Etape 2
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                >
                    Montant
                </Typography>
            </div>
            <div className={clsx(currentStepIndex >= 3 ? "border-primary" : "border-midnight-700", "space-y-3 border-t-2 py-3")}>
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="primary"
                >
                    Etape 3
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                >
                    Signature
                </Typography>
            </div>
        </>
    )
}