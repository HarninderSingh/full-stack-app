declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string | null;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
} 