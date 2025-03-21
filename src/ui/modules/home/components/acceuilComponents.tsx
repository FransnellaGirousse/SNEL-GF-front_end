import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { motion } from "framer-motion";
import Link from "next/link";

export const AcceuilComponents = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Texte et bouton */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left flex-1"
        >
          <Typography
            variant="h5"
            theme="black"
            className="font-bold text-3xl md:text-4xl"
          >
            Flowz
          </Typography>

          <Typography
            variant="h5"
            theme="black"
            className="font-semibold mt-2 text-2xl"
          >
            Smart money, smart life.
          </Typography>

          <p className="text-caption3 pt-6">
            Gérez votre activité en toute simplicité !{" "}
            <Link
              className="text-primary hover:underline transition-all"
              href="/create-company"
            >
              👉 Créez votre entreprise dès maintenant
            </Link>
          </p>

          <div className="flex justify-center md:justify-start mt-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button baseUrl="/login" size="medium">
                Se connecter
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="/assets/images/home/finance.png"
            alt="Gestion Financière"
            className="w-full max-w-sm md:max-w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};
