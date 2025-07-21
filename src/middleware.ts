import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
    callbacks: {
        authorized: ({ token, req }) => {
            const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

            // Allow access only to admins for /admin paths
            if (isAdminPath) {
                return token?.role === "admin";
            }

            // Allow all authenticated users for other paths
            return !!token;
        },
    },
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"], // Protect /admin
};
