"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/ui/design-system/button/button";
import { Input } from "@/ui/design-system/forms/input";
import { useForm } from "react-hook-form";
import { Layout } from "@/ui/components/layout/layout";
import Image from "next/image";

export default function Company() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Données soumises :", data);
    router.push("/dashboard-personnelle");
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen gap-10 p-6">
        {/* Image (masquée sur petits écrans) */}
        <div className="flex-1 hidden lg:flex justify-center">
          <Image
            width={450}
            height={450}
            src="/assets/images/home/perseonaluse.svg"
            alt="Image ..."
            className="max-w-full h-auto"
          />
        </div>

        {/* Formulaire */}
        <div className="flex flex-col items-center w-full lg:w-1/3 bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Formulaire d'Utilisation Personnelle
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <Input
              id="nom"
              placeholder="Nom"
              type="text"
              register={register}
              errors={errors}
              required
            />
            <Input
              id="prenom"
              placeholder="Prénom"
              type="text"
              register={register}
              errors={errors}
              required
            />
            <Input
              id="email"
              placeholder="Email"
              type="email"
              register={register}
              errors={errors}
              required
            />
            <Input
              id="telephone"
              placeholder="Téléphone"
              type="text"
              register={register}
              errors={errors}
              required
            />
            <Input
              id="adresse"
              placeholder="Adresse"
              type="text"
              register={register}
              errors={errors}
              required
            />
            <Button type="submit">Valider</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
