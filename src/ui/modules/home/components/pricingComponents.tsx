export const PricingComponents = () => {
    return (
      <section id="pricing" className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Tarifs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-lg text-center text-gray-900">
            <h3 className="text-2xl font-bold mb-4">Essai gratuit</h3>
            <p className="text-lg">0€/mois</p>
            <ul className="list-disc text-left mt-4">
              <li>Gestion de base</li>
              <li>Rapports basiques</li>
              <li>Email support</li>
            </ul>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md">
              Commencez Gratuitement
            </button>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg text-center text-gray-900">
            <h3 className="text-2xl font-bold mb-4">Plan Standard</h3>
            <p className="text-lg">20€/mois</p>
            <ul className="list-disc text-left mt-4">
              <li>Gestion avancée</li>
              <li>Rapports détaillés</li>
              <li>Support prioritaire</li>
            </ul>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md">
              Souscrire
            </button>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg text-center text-gray-900">
            <h3 className="text-2xl font-bold mb-4">Plan Entreprise</h3>
            <p className="text-lg">Sur devis</p>
            <ul className="list-disc text-left mt-4">
              <li>Support dédié</li>
              <li>API et intégrations personnalisées</li>
            </ul>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md">
              Contactez-nous
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-black">
          <h3 className="text-xl font-semibold mb-2">
            Comment fonctionne l'essai gratuit ?
          </h3>
          <p>
            L'essai gratuit vous donne accès à toutes les fonctionnalités
            pendant 30 jours.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-black mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Puis-je annuler à tout moment ?
          </h3>
          <p>Oui, vous pouvez annuler votre abonnement à tout moment.</p>
        </div>
      </section>
    );
}