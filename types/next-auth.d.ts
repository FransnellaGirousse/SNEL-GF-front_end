import NextAuth from "next-auth"
import { DefaultUser } from "next-auth";
import { Session } from "next-auth";

// Étendre le type `User` pour inclure le champ `role`
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Vous pouvez ajuster le type du rôle (string, array de string, etc.)
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth" {
    interface Session {
        message?: string; // Add your custom property here
    }
}
