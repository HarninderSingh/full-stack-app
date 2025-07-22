import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db("test");
          const user = await db
            .collection("users")
            .findOne({ email: credentials.email });

          if (!user) return null;

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) return null;

          // ✅ Include role in the returned user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email,
            role: user.role || "user", // Default to 'user' if role is missing
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // Refresh every 24 hours
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = typeof user.role === 'string' ? user.role : "user"; // Add role to token
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST, handler as authOptions };