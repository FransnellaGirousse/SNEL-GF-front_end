import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        message?: string; // Add your custom property here
    }
}