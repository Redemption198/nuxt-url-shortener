import { PrismaClient } from "@prisma/client";
import cuid from "cuid";

function isUrl(url: string): boolean {
  try {
    const testUrl = new URL(url);

    return true;
  } catch (error) {
    return false;
  }
}

export default defineEventHandler(async (event) => {
  const { url } = await useBody(event);

  if (!isUrl(url))
    return sendError(
      event,
      createError({ statusCode: 400, message: "Received a non-valid URL" })
    );

  const prisma = new PrismaClient();

  const newURL = await prisma.uRL.create({
    data: {
      originalURL: url,
      shortenURL: cuid.slug(),
      userId: 1,
    },
  });

  console.log(newURL);

  return `http://localhost:3000/s/${newURL.shortenURL}`;
});
