import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token || token.role?.toLowerCase() !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const client = await clientPromise;
    const db = client.db();
    const users = await db
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
    return NextResponse.json({ users });
}
