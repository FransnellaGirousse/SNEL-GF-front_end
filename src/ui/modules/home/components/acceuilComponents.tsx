

export const AcceuilComponents = () => {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-8 rounded-lg shadow-lg">
        <div className="text-black mb-6 md:mb-0 md:mr-6 flex-1">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenue sur Snell - Simplifiez la gestion de
            vos finances
          </h1>
          <p className="text-lg mb-4 ">
            Notre plateforme vous permet de gérer vos comptes en toute
            simplicité, d'accéder à des rapports détaillés, et d'optimiser vos
            dépenses. Que vous soyez un particulier ou une entreprise, nous
            avons les outils pour vous aider à atteindre vos objectifs
            financiers.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="assets/images/home/finance-image.jpeg"
            alt="Gestion Financière"
            className="w-full h-auto"
          />
        </div>
      </div>
    );
}