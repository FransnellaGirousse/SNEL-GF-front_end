"use client"

import {usePathname} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import {Typography} from "@/src/ui/design-system/typography/typography";
import clsx from "clsx";
import {RiHome3Line} from "react-icons/ri";
import {Container} from "@/src/ui/components/container/container"
import Link from "next/link";

export const Breadcrumbs = () => {
    const asPath = usePathname()
    let segments = asPath.split("/")
    const lastSegments = segments[segments.length - 1]
    segments[0] = "accueil"
    const view = segments.map((path, index) => (
        <div key={uuidv4()}>
            <Link href={index > 0 ? `/${segments.slice(1, index + 1).join("/")}` : "/"}>
                <Typography
                    variant="caption3"
                    tag="span"
                    className={clsx(
                        path !== lastSegments ? "text-gray-600" : "text-gray",
                        "capitalize hover:text-gray animate"
                    )}
                >
                    {path !== "accueil" ? path.replace(/-/g, " ") : <RiHome3Line className="inline -mt-1"/>}
                </Typography>
                {path !== lastSegments && (
                    <Typography
                        variant="caption2"
                        tag="span"
                        className="ml-2 text-gray-600"
                    >
                        /
                    </Typography>
                )}
            </Link>
        </div>
    ))
    return (
        <Container className="flex items-center gap-2 py-7">
            {view}
        </Container>
    )
}