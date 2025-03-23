export default async function CheckCompaniesResponsables(key_company, role) {
  try {
    // Envoie la requête POST
    const response = await fetch("http://localhost:8000/api/verify-user-role", {
      method: "POST",
      body: JSON.stringify({
        key_company,
        role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Vérifie si la réponse est correcte
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }

    // Récupère la réponse JSON
    const data = await response.json();

    // Supposons que l'API retourne un objet avec une propriété `found` qui est `true` ou `false`
    return data; // Renvoie true si l'utilisateur avec ce rôle est trouvé, sinon false
  } catch (e) {
    console.error(e);
    return false; // En cas d'erreur, on renvoie false
  }
}
