"use client";

import { Container } from "@/ui/components/container/container";
import Image from "next/image";
import { Box } from "@/ui/design-system/box/box";
import { Typography } from "@/ui/design-system/typography/typography";
import Link from "next/link";
import { FormsType } from "@/types/forms";
import { IoLogoGoogle } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/ui/design-system/button/button";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginForm } from "./AdminLogin.form";

interface Props {
  form: FormsType;
}

export const AdminLoginView = ({ form }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const userRole = session.user?.role;

      if (userRole === "admin") {
        localStorage.setItem("userRole", userRole);
        console.log("Admin connecté :", userRole);
        router.push("/admin/dashboard"); // Redirige vers le dashboard admin
      } else {
        setError(
          "Accès refusé : seuls les administrateurs peuvent se connecter."
        );
      }
    }
  }, [session, router]);

  return (
    <Container className="flex justify-center items-center gap-5 mt-10 mb-32">
      <div className="w-[531px] flex-none max-lg:hidden">
        <div className="relative flex items-center">
          <Image
            width={400}
            height={530}
            src="/assets/images/authentication/adminlogin.image..svg"
            alt="Admin Login Image"
          />
        </div>
      </div>
      <div className="w-full max-lg:w-[450px]">
        <Box padding_y="py-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h5" tag="h1" theme="black">
                Connexion Admin
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography variant="caption4" tag="h2" theme="black">
                Retour à
              </Typography>
              <Typography variant="caption4" tag="span" theme="primary">
                <Link
                  href="/login"
                  className="hover:text-primary-600 transition-all hover:underline"
                >
                  Connexion utilisateur
                </Link>
              </Typography>
            </div>
          </div>
          {error && (
            <Typography
              variant="caption2"
              tag="p"
              className="mt-2 text-red-500"
            >
              {error}
            </Typography>
          )}
          <AdminLoginForm form={form} />
         
        </Box>
      </div>
    </Container>
  );
};
