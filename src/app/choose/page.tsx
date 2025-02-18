"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/ui/design-system/button/button";
import { useState } from "react";

export default function ChoixUtilisation() {
  const router = useRouter();
  const [choix, setChoix] = useState<string | null>(null);

  const handleChoice = (type: string) => {
    setChoix(type);
  };

  const handleSubmit = () => {
    if (choix === "entreprise") {
      router.push("/formulaire-entreprise");
    } else {
      router.push("/PersonalUseForm");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {!choix ? (
        <>
          <h1 className="text-2xl font-bold">
            Êtes-vous une entreprise ou un utilisateur personnel ?
          </h1>
          <div className="flex gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 cursor-pointer bg-white shadow-md rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
              onClick={() => handleChoice("personnelle")}
            >
              <h2 className="text-lg font-semibold">Utilisation Personnelle</h2>
              <p className="text-sm text-gray-600">
                Gérez vos finances personnelles en toute simplicité.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 cursor-pointer bg-white shadow-md rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
              onClick={() => handleChoice("entreprise")}
            >
              <h2 className="text-lg font-semibold">Entreprise</h2>
              <p className="text-sm text-gray-600">
                Gérez les finances de votre entreprise efficacement.
              </p>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold">
            Vous avez choisi :{" "}
            {choix === "entreprise" ? "Entreprise" : "Utilisation Personnelle"}
          </h2>
          <Button onClick={handleSubmit}>Continuer</Button>
        </div>
      )}
    </div>
  );
}
