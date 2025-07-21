import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db(); // or pass your DB name here

          const user = await db.collection("users").findOne({ email: credentials.email });
          if (!user) {
            console.log("User not found");
            return null;
          }

          const isValid = await compare(credentials.password, user.password);
          console.log("Password valid:", isValid);

          if (!isValid) {
            return null;
          }

          console.log("User authenticated:", user.email);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login?error=1", // you can customize error page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
