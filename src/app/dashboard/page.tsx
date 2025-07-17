"use client";
import { useSession } from "next-auth/react";
export default function DashboardPage() {
const { data: session } = useSession();
return (
<main className="max-w-4xl mx-auto mt-10">
<h1 className="text-3xl font-semibold">Dashboard</h1>
<p className="mt-2 text-gray-700">
Welcome back, {session?.user?.email}.
</p>
</main>
);
}
