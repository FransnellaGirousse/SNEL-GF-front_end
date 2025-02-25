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
        if (credentials) {
          try {
            const res = await fetch("http://localhost:8000/api/login", {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            const user = data.user;
            if (!user) return null;
            return user;
          } catch (e) {
            console.error(
              "Erreur lors de la recuperation de l'utilisateur !",
              e
            );
          }
        }
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
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
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
    async session({ session, token, user }) {
      if (user) {
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
