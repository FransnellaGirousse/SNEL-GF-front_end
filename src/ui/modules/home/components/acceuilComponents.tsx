import { Typography } from "@/ui/design-system/typography/typography";

export const AcceuilComponents = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-8 rounded-lg shadow-lg">
      <div className="text-black mb-6 md:mb-0 md:mr-6 flex-1">
        <Typography
          variant="h5" 
          theme="black"
        >
          Bienvenue sur FinanSnell - Simplifiez la gestion de vos finances
        </Typography>

        <Typography 
        variant="caption2" 
        tag="p"
        theme="black">
          Notre plateforme vous permet de gérer vos comptes en toute simplicité,
          d'accéder à des rapports détaillés, et d'optimiser vos dépenses. Que
          vous soyez un particulier ou une entreprise, nous avons les outils
          pour vous aider à atteindre vos objectifs financiers.
        </Typography>
      </div>
      <div className="flex-1">
        <img
          src="/assets/images/home/finance-image.jpeg" 
          alt="Gestion Financière"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};
