"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    name?: string;
    email: string;
    role?: string;
    createdAt?: string;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (session?.user?.role?.toLowerCase() === "admin") {
            fetch("/api/admin/users")
                .then((res) => {
                    if (!res.ok) throw new Error("Unauthorized");
                    return res.json();
                })
                .then((data) => setUsers(data.users))
                .catch(() => setError("Failed to load users"));
        }
    }, [session]);

    if (status === "loading") {
        return <p className="p-6">Loading your dashboard...</p>;
    }
    if (!session || session.user?.role?.toLowerCase() !== "admin") {
        return <main className="flex justify-center items-center min-h-[70vh]">
            <div className="card-modern w-full max-w-2xl text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700">You do not have permission to view this page.</p>
            </div>
        </main>;
    }
    return (
        <main className="flex flex-col items-center min-h-[70vh]">
            <div className="card-modern w-full max-w-2xl mb-10">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to Your Dashboard</h1>
                <p className="text-lg text-gray-700 mb-2">
                    Logged in as: <strong>{session.user?.email}</strong>
                </p>
                <p className="text-base text-gray-600 mb-4">
                    Here you can view and manage your account, data, and preferences.
                </p>
            </div>
            <div className="card-modern w-full max-w-5xl">
                <h2 className="text-xl font-semibold mb-3 text-green-700">All Users</h2>
                {error && <p className="text-red-600">{error}</p>}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left px-2 py-1">Name</th>
                                <th className="text-left px-2 py-1">Email</th>
                                <th className="text-left px-2 py-1">Role</th>
                                <th className="text-left px-2 py-1">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b">
                                    <td className="px-2 py-1">{user.name || <span className="text-gray-400 italic">(no name)</span>}</td>
                                    <td className="px-2 py-1">{user.email}</td>
                                    <td className="px-2 py-1">{user.role || <span className="text-gray-400 italic">user</span>}</td>
                                    <td className="px-2 py-1">{user.createdAt ? new Date(user.createdAt).toLocaleString() : <span className="text-gray-400 italic">N/A</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

