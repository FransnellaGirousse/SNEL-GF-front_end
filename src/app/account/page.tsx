"use client";

import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import { AccountContainer } from "@/ui/modules/account/account.container";
import { toast } from "react-toastify";
import useStore from "@/store/useStore";
import { useEffect } from "react";

export default function Account() {
  const { user, setUser } = useStore();
  useEffect(() => {
    if (Object.keys(user).length > 0 && user.role === "visiteur") {
      toast.warning("Veuillez choisir votre rôle");
    }
  }, [user]);
  return (
    <Layout>
      <Container className="mt-10">
        <div className="flex justify-center">
          <div className="border-2 border-gray-400 flex-none max-sm:w-full max-lg:w-[600px] w-[1000px] rounded p-10 relative">
            <AccountContainer />
          </div>
        </div>
      </Container>{" "}
    </Layout>
  );
}
