"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/"); // Always redirect to home page
            router.refresh();
        }
    }

    return (
        <main className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-green-50">
            <div className="w-full max-w-lg px-10 py-8 bg-white/90 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    {error && <p className="text-red-600 text-center font-medium">{error}</p>}
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition-colors shadow">
                        Sign In
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="mb-2 text-gray-600">or</p>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-lg transition-colors shadow"
                    >
                        Sign in with Google
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-gray-600">Don&apos;t have an account?</p>
                    <a href="/register" className="text-green-600 underline font-medium">Register here</a>
                </div>
            </div>
        </main>
    );
}
