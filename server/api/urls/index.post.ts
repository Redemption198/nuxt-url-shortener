import { PrismaClient } from "@prisma/client";
import cuid from "cuid";

export default defineEventHandler(async (req) => {
  const prisma = new PrismaClient();

  const { url } = await useBody(req);

  const newURL = await prisma.uRL.create({
    data: {
      originalURL: url,
      shortenURL: cuid.slug(),
      userId: 1,
    },
  });

  console.log(newURL);

  return `http://localhost:3000/${newURL.shortenURL}`;
});
