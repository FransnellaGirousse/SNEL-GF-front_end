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
                    return { ...user, token: user.token }; // Return user object if successful
                }
                return null; // Return null if user not found
            },
        }),
    ],
    pages: {
        signIn: '/login', // Custom sign-in page
    },
    debug: true
});