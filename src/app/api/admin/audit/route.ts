import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    // Authenticate admin user
    const session = await getServerSession(authOptions) as { user: { id: string; role: string } } | null;

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Fetch 50 most recent audit logs, sorted by newest first
    const logs = await db
        .collection("audit_logs")
        .find({})
        .sort({ timestamp: -1 })
        .limit(50)
        .toArray();

    return NextResponse.json({ logs });
}
