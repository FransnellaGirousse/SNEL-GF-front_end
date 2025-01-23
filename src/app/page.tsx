"use client"

import {Layout} from "@/ui/components/layout/layout"
import { HomeContainer } from "@/ui/modules/home/home.container";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session)
  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
}