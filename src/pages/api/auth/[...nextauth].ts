import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Faire la requête à ton backend Laravel pour récupérer les informations utilisateur
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user.token) {
          // Ajouter le rôle à la réponse de l'API, si disponible
          return {
            ...user,
            role: user.role, // Assurez-vous que le rôle est dans la réponse de l'API
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        // Gérer la redirection en fonction du rôle
        const userRole = url.includes("director") ? "/approval" : "/dashboard";
        return userRole; // Remplacer par la page appropriée
      }
      return baseUrl + "/dashboard";
    },
    async jwt({ token, account, user }) {
      if (user) {
        // Ajouter des informations utilisateur dans le token JWT
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        // Attribution des rôles en fonction des emails spécifiques
        if (user.email === "fransnellagirousse@gmail.com") {
          token.role = "user"; // Rôle "user" pour cet email
        } else if (user.email === "snelgirousse@gmail.com") {
          token.role = "director"; // Rôle "director" pour cet email
        } else if (user.email === "gestionnairefinansnell@gmail.com") {
          token.role = "administrator"; // Rôle "administrator" pour cet email
        } else if (user.email === "comptablefinansnell@gmail.com") {
          token.role = "accountant"; // Rôle "accountant" pour cet email
        } else {
          token.role = "user"; // Par défaut, rôle "user" pour les autres utilisateurs
        }
      }

      await fetch("http://localhost:8000/api/register/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name,
          google_id: account?.providerAccountId,
        }),
      });
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role; // Ajouter le rôle à la session
      }
      return session;
    },
  },
  debug: true,
});
