import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== "admin") {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const { userId, newRole } = await req.json();

    if (!["admin", "user"].includes(newRole)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Prevent self-demotion
    // if (session.user.id === userId && newRole !== "admin") {
    //     return NextResponse.json(
    //         { error: "Admins cannot demote themselves" },
    //         { status: 400 }
    //     );
    // }

    // Fetch target user
    const targetUser = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });

    // Count current admins
    const adminCount = await db
        .collection("users")
        .countDocuments({ role: "admin" });

    // Prevent demotion of last admin
    if (targetUser?.role === "admin" && newRole !== "admin" && adminCount === 1) {
        return NextResponse.json(
            { error: "Cannot demote the last remaining admin" },
            { status: 400 }
        );
    }

    // Proceed with role update
    await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { role: newRole } }
    );

    return NextResponse.json({ success: true, role: newRole });
}
