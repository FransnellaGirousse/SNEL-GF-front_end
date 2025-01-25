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
        // Ajouter le rôle au JWT lors de la création du token
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // Ajout du rôle dans le token
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
