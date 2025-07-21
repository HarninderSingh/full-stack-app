import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // update path if needed
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("test");

        const user = await db.collection("users").findOne({ email: session.user.email });

        return NextResponse.json({
            message: "Secure data access granted",
            user: {
                id: user?._id,
                email: user?.email,
                name: user?.name,
            },
        });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}
