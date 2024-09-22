import {PropsWithChildren} from "react";
import clsx from "clsx";

interface Props {
    className?: string,
    padding_x?: string,
    padding_y?: string
}

export const Box = ({
                        className,
                        padding_x = "px-9",
                        padding_y = "py-9",
                        children
                    }: PropsWithChildren<Props>) => {
    return (
        <div className={
            clsx(
                "w-full border border-midnight-700 rounded",
                className,
                padding_x,
                padding_y
            )
        }>
            {children}
        </div>
    )
}