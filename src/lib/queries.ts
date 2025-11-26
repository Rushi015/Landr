"use server";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export const getAuthUserdetails = async () => {
  const session = await auth();
  if (!session?.user) {
    return;
  }

  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? undefined,
    },
    include: {
      workspace: {
        include: {},
      },
    },
  });
  return userData;
};

export const getWorkSpaceByUserID = async (UserId: number) => {
  const User = await prisma.user.findFirst({
    where: {
      id: UserId,
    },
    select: { workspaceId: true },
  });

  if (!User?.workspaceId) return null;

  const workspace = await prisma.workSpace.findUnique({
    where: { id: User?.workspaceId },
  });

  return workspace;
};

interface WorkSpaceData {
  id: string;
  name: string;
  email: string;
  mobNumber: string;
}
export const createWorkspce = async (workSpacedata: WorkSpaceData) => {
  const WorkSpace = await prisma.workSpace.create({
    data: {
      name: workSpacedata.name,
      companyEmail: workSpacedata.email,
      companyPhone: workSpacedata.mobNumber,
      id: workSpacedata.id,
    },
  });
  return WorkSpace;
};
