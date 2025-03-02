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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="relative bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 text-center">
              {plan.title}
            </h3>

            <p className="text-center text-3xl font-bold text-blue-600 my-4">
              {plan.price}
            </p>

            <ul className="space-y-2 text-gray-600">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                }}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                {plan.buttonText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
