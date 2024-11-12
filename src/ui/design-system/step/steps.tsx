"use client"

import {Typography} from "@/ui/design-system/typography/typography";
import clsx from "clsx";
import {v4 as uuidv4} from "uuid";
import {Step} from "@/types/step";
import { ReactNode } from "react";

interface Props {
    currentStepIndex: number,
    steps: Step[],
    
}

export const Steps = ({currentStepIndex, steps}: Props) => {

    return(
        <>
            {steps.map((step) => {
                const stepNumber: number = step.number
                return (
                  <div
                    key={uuidv4()}
                    className={clsx(
                      currentStepIndex >= stepNumber
                        ? "border-primary"
                        : "border-gray-400",
                      "max-lg:hidden border-t-2 py-3"
                    )}
                  >
                    <StepTypography name={step.name} number={stepNumber} />
                      {step.icon && (
                        <span className="step-icon mr-2">{step.icon}</span>
                      )}
                  </div>
                );
            })}
        </>
    )
}

export const StepTypography = ({name, number}: Step) => {
    return(
        <div className="space-y-2">
            <Typography
                variant="caption2"
                tag="p"
                theme="primary"
            >
                Etape {number}
            </Typography>
            <Typography
                variant="caption3"
                tag="p"
                theme="black"
            >
                {name}
            </Typography>
        </div>
    )
}