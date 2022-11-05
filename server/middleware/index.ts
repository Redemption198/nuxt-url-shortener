import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  if (event.req.url === "/" || event.req.url === "/test") {
    return;
  }

  const prisma = new PrismaClient();

  const shortenURL = event.req.url.replace("/", "");

  const storedURL = await prisma.uRL.findUnique({
    where: { shortenURL },
  });

  if (storedURL && storedURL.active) {
    await prisma.uRL.update({
      where: {
        id: storedURL.id,
      },
      data: {
        visits: Number(storedURL.visits) + 1,
      },
    });

    return sendRedirect(event, storedURL.originalURL, 301);
  }
});
