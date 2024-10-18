export const NewsletterComponents = () => {
    return (
      <section id="newsletter" className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Inscrivez-vous à notre Newsletter
        </h2>
        <p className="text-lg mb-6">
          Recevez des conseils exclusifs et les dernières actualités sur la
          gestion financière.
        </p>
        <form className="flex flex-col items-center">
          <input
            type="email"
            className="p-4 w-80 bg-gray-800 rounded-md text-white mb-4"
            placeholder="Entrez votre email"
          />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md">
            S'inscrire
          </button>
        </form>
      </section>
    );
}