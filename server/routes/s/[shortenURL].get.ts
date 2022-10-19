import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const shortenURL = event.context.params.shortenURL;
  const storedURL = await prisma.uRL.findUniqueOrThrow({
    where: { shortenURL },
  });

  if (storedURL.active) return sendRedirect(event, storedURL.originalURL, 301);

  return prisma.uRL.findMany();
});
