"use client";

import { Container } from "@/ui/components/container/container";
import { Logo } from "@/ui/design-system/logo/logo";
import { Typography } from "@/ui/design-system/typography/typography";
import { Button } from "@/ui/design-system/button/button";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { Sidebar } from "@/ui/components/navigation/sidebar";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { IoPowerSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { Avatar } from "@/ui/design-system/avatar/avatar";

interface Props {}

export const Navigation = ({}: Props) => {
  const [show, setShow] = useState(false);
  const [showingNav, setShowingNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();

  const handleClick = () => {
    setShow((show) => !show);
  };

  const showNav = () => {
    setShowingNav((show) => !show);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // Logique de recherche à implémenter ici
  };

  return (
    <section>
      <div className="border-b-2 border-gray-400">
        <Container className="flex items-center justify-between py-1.5 gap-7">
          <div className="flex items-center gap-5 relative">
            <div className="z-20">
              {session && (
                <button
  type="button"
  onClick={handleClick}
  className={clsx(
    "relative z-20 border-2 border-gray text-gray rounded flex items-center justify-center w-[40px] h-[40px] transition-transform duration-300",
    show ? "rotate-90" : "rotate-0"
  )}
>
  {show ? <IoCloseSharp /> : <RxHamburgerMenu />}
</button>

              )}
            </div>
            <Link href="/">
              <div className="flex items-center gap-2.5">
                <Logo size="small" />
                <div className="flex flex-col max-sm:hidden">
                  <div className="text-gray font-extrabold text-[24px]">
                    FinanSnell
                  </div>
                  <Typography variant="caption4" tag="span" theme="gray">
                    Votre solution financière !
                  </Typography>
                </div>
              </div>
            </Link>
          </div>

          {session && (
            <form
              onSubmit={handleSearch}
              className="flex items-center w-[40%] max-w-md gap-2 transition-all duration-300 hover:w-[50%]"
            >
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-l-full py-2 px-4 w-full outline-none focus:border-primary transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-gray-300 hover:bg-primary-300 rounded-r-full py-3 px-4 flex items-center justify-center transition-colors duration-300"
              >
                <IoMdSearch />
              </button>
            </form>
          )}

          {session ? (
            <div className="flex items-center gap-5">
              <div className="relative">
                <RiNotification2Line />
                {/* Ajouter ici une logique de notification non lue si nécessaire */}
              </div>

              <div className="relative">
                <div className="flex justify-between gap-1 items-center">
                  <Avatar
                    size="medium"
                    src={session?.user?.image ?? "/default-avatar.png"}
                    alt={session?.user?.name ?? "Utilisateur"}
                  />

                  <span className="text-2xl" onClick={showNav}>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                </div>
                <div
                  className={clsx(
                    "absolute w-[200px] bg-white p-5 right-0 top-10 shadow-2xl rounded",
                    !showingNav ? "hidden" : "block"
                  )}
                >
                  <Typography variant="caption3" tag="span" theme="black">
                    <Link
                      href="/profile"
                      className="flex justify-between gap-2
                      items-center text-gray hover:text-primary transition-all
                      mb-3"
                    >
                      <MdOutlineAccountCircle />
                      Mon compte
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex justify-between gap-2 items-center text-gray hover:text-primary transition-all"
                    >
                      <IoPowerSharp />
                      Déconnecter
                    </button>
                  </Typography>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-7">
              <div className="flex items-center gap-2">
                <Button baseUrl="/login" size="small">
                  Connexion
                </Button>
                <Button size="small" variant="outline" baseUrl="/register">
                  Réjoindre
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>
      <Sidebar show={show} />
    </section>
  );
};
