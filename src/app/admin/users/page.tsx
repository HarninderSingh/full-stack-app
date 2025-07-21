"use client";

import { useEffect, useState } from "react";

interface User {
    _id: string;
    email: string;
    name: string;
    role: string;
}

export default function AdminUserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/admin/users")
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => setUsers(data.users))
            .catch(() => setError("Access denied or failed to load users."));
    }, []);

    return (
        <main className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-semibold mb-4">User Management</h1>
            {error && <p className="text-red-600">{error}</p>}
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2 px-3">Email</th>
                        <th className="text-left py-2 px-3">Name</th>
                        <th className="text-left py-2 px-3">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="py-2 px-3">{user.email}</td>
                            <td className="py-2 px-3">{user.name}</td>
                            <td className="py-2 px-3 capitalize">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
