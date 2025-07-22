"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export default function NavBar() {
  const { data: session, status } = useSession();
  return (
    <header className="navbar-glass shadow p-5 rounded-b-xl">
      <nav className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {session && <Link href="/dashboard">Dashboard</Link>}
        </div>
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <span>Loading...</span>
          ) : session ? (
            <>
              <span className="text-sm text-gray-700">{session.user?.email}</span>
              <button
                className="text-blue-600 underline"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 underline">
                Login
              </Link>
              <Link href="/register" className="text-green-600 underline ml-4">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
