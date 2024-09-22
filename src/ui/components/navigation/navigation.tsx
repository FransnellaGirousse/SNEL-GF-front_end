"use client"

import {Container} from "@/ui/components/container/container"
import {Logo} from "@/ui/design-system/logo/logo";
import {Typography} from "@/ui/design-system/typography/typography";
import {Button} from "@/ui/design-system/button/button";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {useState} from "react";
import { IoCloseSharp } from "react-icons/io5";
import {Sidebar} from "@/ui/components/navigation/sidebar";

interface Props {
}

export const Navigation = ({}: Props) => {
    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow((show) => !show)
    }
    return (
        <section>
            <div className="border-b-2 border-midnight-700">
                <Container className="flex items-center justify-between py-1.5 gap-7">
                    <div className="flex items-center gap-5">
                        <div className="z-20">
                            <button
                                type="button"
                                className="border-2 border-white text-white rounded flex items-center justify-center w-[40px] h-[40px]"
                                onClick={handleClick}
                            >
                                {show ?  <IoCloseSharp/> : <RxHamburgerMenu />}
                            </button>
                        </div>
                        <Link href="/">
                            <div className="flex items-center gap-2.5">
                                <Logo size="small"/>
                                <div className="flex flex-col">
                                    <div className="text-white font-extrabold text-[24px]">
                                        Gestion Financières
                                    </div>
                                    <Typography
                                        variant="caption4"
                                        tag="span"
                                        theme="gray"
                                    >
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Votre solution financière !
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-7">
                        <div className="flex items-center gap-2">
                            <Button
                                baseUrl="/login"
                                size="small"
                            >
                                Connexion
                            </Button>
                            <Button
                                size="small"
                                variant="outline"
                                baseUrl="/register"
                            >
                                Réjoindre
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
            <Sidebar show={show}/>
        </section>
    )
}