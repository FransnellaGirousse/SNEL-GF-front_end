import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { motion } from "framer-motion";

export const AcceuilComponents = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row  ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left mb-6 md:mb-0 md:mr-6 flex-1"
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

          <Typography
            variant="caption2"
            tag="p"
            theme="black"
            className="mt-4 text-gray-700"
          >
            ✏️ 🚀
          </Typography>

          <div className="flex justify-start mt-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4"
            >
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
          className="flex-1"
        >
          <img
            src="/assets/images/home/finance.png"
            alt="Gestion Financière"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </>
  );
};
