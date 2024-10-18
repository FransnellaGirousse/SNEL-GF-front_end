export const TestimonialComponents = () => {
    return (
      <section id="testimonials" className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Témoignages</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-black">
            <p className="mb-4">
              "Grâce à Snell, nous avons réduit nos coûts de 20
              % en un mois."
            </p>
            <h3 className="font-bold">— Jean Dupont, CEO de XYZ</h3>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-black">
            <p className="mb-4">
              "Cette plateforme a transformé notre gestion financière. Simple et
              sécurisé."
            </p>
            <h3 className="font-bold">— Marie Martin, Freelance</h3>
          </div>
        </div>
      </section>
    );
}