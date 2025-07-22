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
    const [editRole, setEditRole] = useState<{ [id: string]: string }>({});
    const [savingId, setSavingId] = useState<string | null>(null);

    // No admin user management
    useEffect(() => {}, []);

    const handleRoleChange = (id: string, newRole: string) => {
        setEditRole((prev) => ({ ...prev, [id]: newRole }));
    };

    const handleSaveRole = async (id: string) => {
        setSavingId(id);
        const newRole = editRole[id];
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            if (!res.ok) throw new Error("Failed to update role");
            setUsers((prev) => prev.map((u) => u._id === id ? { ...u, role: newRole } : u));
        } catch {
            alert("Failed to update role");
        } finally {
            setSavingId(null);
        }
    };

    if (status === "loading") {
        return <p className="p-6">Loading your dashboard...</p>;
    }
    if (!session) {
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
            {/* User management removed */}
        </main>
    );
}

