import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db("test");
          const user = await db.collection("users").findOne({ email: credentials.email });

          if (!user) return null;

          const isPasswordValid = await compare(credentials.password, user.password);
          if (!isPasswordValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],


  // ✅ Add persistent login config here
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,    // 30 days
    updateAge: 24 * 60 * 60       // Refresh every 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60     // 30 days
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // If signing in (first login), attach id from DB (for both Google & Credentials)
      if (user) {
        const client = await clientPromise;
        const db = client.db("test");

        // Find the user by email regardless of provider
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (existingUser) {
          token.id = existingUser._id.toString(); // unify sessions
          token.email = existingUser.email;
        } else {
          // fallback in case user doesn't exist
          token.id = user.id;
          token.email = user.email;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST, handler as authOptions };
