import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-gray-100 text-gray-900">
<SessionProviderWrapper>
<NavBar />
<main className="p-6">{children}</main>
<footer className="mt-auto bg-white p-4 text-center text-sm border-t">
&copy; 2025 MERN Full-Stack Tutorial
</footer>
</SessionProviderWrapper>
</body>
</html>
);
}
