import { motion } from "framer-motion";
import { Typography } from "@/ui/design-system/typography/typography";

export const SubscriptionPlans = () => {
  const plans = [
    {
      title: "Basic",
      price: "Gratuit",
      features: ["Accès limité", "Support standard", "Publicités"],
      buttonText: "Choisir Basic",
    },
    {
      title: "Pro",
      price: "15€/mois",
      features: ["Accès complet", "Support prioritaire", "Pas de publicités"],
      buttonText: "Choisir Pro",
    },
    {
      title: "Premium",
      price: "30€/mois",
      features: [
        "Accès complet",
        "Support 24/7",
        "Statistiques avancées",
        "Personnalisation",
      ],
      buttonText: "Choisir Premium",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Abonnement</h2>
        <Typography theme="black">
          Choisissez le plan qui convient le mieux à vos besoins
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="relative bg-white/30 backdrop-blur-xl shadow-xl rounded-2x p-8 hover:shadow-2xl transition-all border border-gray-200 border-x-primary-600"
            whileHover={{ scale: 1.05 }}
          >
            {/* Effet lumineux sur le coin supérieur */}
            <div className="absolute -top-4 right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50"></div>

            {/* Titre du plan */}
            <h3 className="text-3xl font-bold text-gray-900 text-center dark:text-white">
              {plan.title}
            </h3>

            {/* Prix avec effet futuriste */}
            <p className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text my-6">
              {plan.price}
            </p>

            {/* Liste des fonctionnalités */}
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Bouton stylisé */}
           <div className="mt-8 flex justify-center relative">

          {/* Effet lumineux derrière le bouton */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-36 h-12 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-lg rounded-lg"></div>
          </div>

      {/* Bouton avec effets interactifs */}
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 20px rgba(37, 99, 235, 0.6)",
        }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 font-bold rounded-xl shadow-lg transition-all hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none"
      >
        {plan.buttonText}
      </motion.button>
</div>

            {/* Effet de lueur */}
            <div className="absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-b from-blue-500 to-purple-500 blur-2xl"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
