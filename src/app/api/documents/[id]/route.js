import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();
    if (!authUser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: authUser.id },
    });
    if (!dbUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const doc = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!doc || doc.userId !== dbUser.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (error) {
    console.error("[GET /api/documents/[id]] Error:", error);
    return NextResponse.json(
      { error: "failed to fetch document" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { getUser } = getKindeServerSession();
    const authUser = await getUser();
    if (!authUser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: authUser.id },
    });
    if (!dbUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const doc = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!doc || doc.userId !== dbUser.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.document.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/documents/[id]] Error:", error);
    return NextResponse.json(
      { error: "failed to delete document" },
      { status: 500 }
    );
  }
}
