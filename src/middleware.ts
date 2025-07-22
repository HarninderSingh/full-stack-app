import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token, req }) => {
            const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

            // Only allow users with admin role to access /admin routes
            if (isAdminPath) {
                return token?.role === "admin";
            }

            // Allow all authenticated users to access other protected routes
            return !!token;
        },
    },
    pages: {
        signIn: "/login", // Redirect unauthenticated users to /login
    },
});

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"], // Protect these routes
};
