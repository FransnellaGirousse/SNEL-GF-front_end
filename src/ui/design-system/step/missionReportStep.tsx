"use client"

import {Typography} from "@/ui/design-system/typography/typography";
import clsx from "clsx";

interface Props {
    currentStepIndex: number
}

export const MissionReportStep = ({currentStepIndex}: Props) => {
    return(
        <>
            <div
                className={clsx(currentStepIndex >= 1 ? "border-primary" : "border-gray-400", "space-y-3 border-t-2 py-3")}>
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
                    theme="black"
                >
                    Informations de la Mission
                </Typography>
            </div>
            <div
                className={clsx(currentStepIndex >= 2 ? "border-primary" : "border-gray-400", "space-y-3 border-t-2 py-3")}>
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
                    theme="black"
                >
                    Objectifs de la mission
                </Typography>
            </div>
            <div
                className={clsx(currentStepIndex >= 3 ? "border-primary" : "border-gray-400", "space-y-3 border-t-2 py-3")}>
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
                    theme="black"
                >
                    Déroulements des activités
                </Typography>
            </div>
            <div
                className={clsx(currentStepIndex >= 4 ? "border-primary" : "border-gray-400", "space-y-3 border-t-2 py-3")}>
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="primary"
                >
                    Etape 4
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                    theme="black"
                >
                    Résultats
                </Typography>
            </div>
            <div
                className={clsx(currentStepIndex >= 5 ? "border-primary" : "border-gray-400", "space-y-3 border-t-2 py-3")}>
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="primary"
                >
                    Etape 5
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                    theme="black"
                >
                    Récommendations
                </Typography>
            </div>
            <div
                className={clsx(currentStepIndex >= 6 ? "border-primary" : "border-gray-400", "space-y-3 border-t-2 py-3")}>
                <Typography
                    variant="caption2"
                    tag="p"
                    theme="primary"
                >
                    Etape 6
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                    theme="black"
                >
                    Prochaines étapes
                </Typography>
            </div>
        </>
    )
}