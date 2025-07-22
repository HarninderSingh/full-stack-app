"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="flex justify-center items-center min-h-[70vh]">
      <div className="card-modern w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the MERN Full-Stack App</h1>
        {status === "loading" ? (
          <p className="text-lg">Loading...</p>
        ) : session ? (
          <div className="space-y-4">
            <p className="text-xl text-green-600">
              Welcome back, <strong>{session.user?.email}</strong>! 🎉
            </p>
            <p className="text-lg text-gray-700">
              You are successfully logged in. You can now access all features of the application.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/about" 
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              This is the home page. Please log in to access all features.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
  