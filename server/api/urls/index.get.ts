import { PrismaClient } from "@prisma/client";

export default defineEventHandler(() => {
  const prisma = new PrismaClient();

  return prisma.uRL.findMany();
});
