import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  events: {
    async signIn({ user }) {
      if (!user?.email) return;

      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name ?? "",
        },
        create: {
          name: user.name ?? "",
          email: user.email,
          userName: user.name ?? "",
          password: "",
        },
      });
    },
  },
});
