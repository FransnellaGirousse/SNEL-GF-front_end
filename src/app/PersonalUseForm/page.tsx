"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/ui/design-system/button/button";
import { Input } from "@/ui/design-system/forms/input";
import { useForm } from "react-hook-form";
import { Layout } from "@/ui/components/layout/layout";


export default function PersonalUseForm() {
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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Formulaire d'Utilisation Personnelle
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80 bg-white p-6 shadow-md rounded-lg"
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
    </Layout>
  );
}
