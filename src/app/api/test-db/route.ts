import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
export async function GET() {
    // full-stack-app/src/app/api/test-db/route.ts
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const collections = await db.listCollections().toArray();
        return NextResponse.json({ collections });
    } catch {
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}