"use client";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

interface User {
    _id: string;
    email: string;
    name: string;
    role: string;
}

function RoleControl({ user }: { user: User }) {
    const [updating, setUpdating] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        setUpdating(true);
        await fetch("/api/admin/users/role", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id, newRole }),
        });
        setUpdating(false);
    };

    return (
        <select
            value={user.role}
            onChange={handleChange}
            disabled={updating}
            className="border px-2 py-1"
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
    );
}
function DeleteUserButton({ userId }: { userId: string }) {
    const [open, setOpen] = useState(false);

    async function handleDelete() {
        await fetch("/api/admin/users/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });
        setOpen(false);
        // TODO: Refresh the user list after delete if needed
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="text-red-600 underline">
                Delete
            </button>
            {open && (
                <ConfirmModal
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this user? This action cannot be undone."
                    onConfirm={handleDelete}
                    onCancel={() => setOpen(false)}
                />
            )}
        </>
    );
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
                        <th className="text-left py-2 px-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="py-2 px-3">{user.email}</td>
                            <td className="py-2 px-3">{user.name}</td>
                            <td className="py-2 px-3">
                                <RoleControl user={user} />
                            </td>
                            <td className="py-2 px-3">
                                <DeleteUserButton userId={user._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
