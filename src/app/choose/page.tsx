"use client";

import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Typography } from "@/ui/design-system/typography/typography";

export default function ChoixUtilisation() {
  const [choix, setChoix] = useState<string | null>(null);

  useEffect(() => {
    if (choix === "entreprise") {
      redirect("/Company");
    } else if (choix === "personnel") {
      redirect("/PersonalUseForm");
    }
  }, [choix]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Typography theme="black" variant="caption2">
        Êtes-vous une entreprise ou un utilisateur personnel ?
      </Typography>

      <div className="flex gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-6 cursor-pointer bg-white shadow-md rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
          onClick={() => setChoix("personnel")}
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
          onClick={() => setChoix("entreprise")}
        >
          <h2 className="text-lg font-semibold">Entreprise</h2>
          <p className="text-sm text-gray-600">
            Gérez les finances de votre entreprise efficacement.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
