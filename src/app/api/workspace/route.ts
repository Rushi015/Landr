import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, email, mobNumber } = body;

  const workspace = await prisma.workSpace.create({
    data: {
      id,
      name,
      companyEmail: email,
      companyPhone: mobNumber,
    },
  });

  return NextResponse.json(workspace);
}
