import {PropsWithChildren} from "react";
import clsx from "clsx";

interface Props {
    className?: string
}

export const Container = ({className, children}: PropsWithChildren<Props>) => {
    return (
        <section className={clsx(
            "w-full max-w-7xl mx-auto px-5 lg:px-10",
            className)}>
            {children}
        </section>
    )
}

