"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();
    const params = useSearchParams();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        console.log("Login result:", res);

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    }

    return (
        <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full border px-3 py-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full border px-3 py-2"
                />
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">
                    Sign In
                </button>
            </form>

            {/* Google Sign-in Button */}
            <div className="mt-6 text-center">
                <p className="mb-2 text-gray-600">or</p>
                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="bg-red-600 text-white px-4 py-2 w-full rounded"
                >
                    Sign in with Google
                </button>
            </div>
        </main>
    );
}
