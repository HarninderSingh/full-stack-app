import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const token = await getToken({ req });
    if (!token || token.role?.toLowerCase() !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const { role } = await req.json();
    if (!role) {
        return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("users").updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { role } }
    );
    if (result.matchedCount === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
} 