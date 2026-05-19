import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiResponse } from "./lib/types/api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload: ApiResponse = await response.json();

        if (!response.ok || "error" in payload) {
          throw new Error("error" in payload ? payload.error : "Login failed");
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;

        session.user.firstName = token.firstName as string;

        session.user.lastName = token.lastName as string;

        session.user.username = token.username as string;

        session.user.email = token.email as string;

        session.user.phone = token.phone as string;

        session.user.role = token.role;

        session.user.photo = token.photo as string;

        session.user.accesstoken = token.accessToken as string;
      }

      return session;
    },
  },
};
