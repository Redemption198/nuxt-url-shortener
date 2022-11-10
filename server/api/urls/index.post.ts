import cuid from "cuid";
import jwt from "jsonwebtoken";
import { prisma } from "~~/prisma/db";

function isUrl(url: string): boolean {
  try {
    const testUrl = new URL(url);

    return true;
  } catch (error) {
    return false;
  }
}

export default defineEventHandler(async (event) => {
  /**
   * Move this into a middleware when it can be configured per server route
   *
   * https://github.com/nuxt/framework/issues/7598
   *
   *  */
  const cookies = parseCookies(event);

  if (!cookies.jwt)
    return sendError(
      event,
      createError({ statusCode: 400, message: "No token provided" })
    );

  const decoded = jwt.verify(cookies.jwt, process.env.JWT_SECRET);

  if (!decoded) 
return sendError(event, createError({ statusCode: 403 }));

  // ---

  const { url } = await useBody(event);

  if (!isUrl(url)) return sendError(event, createError({ statusCode: 400 }));

  const newURL = await prisma.uRL.create({
    data: {
      originalURL: url,
      shortenURL: cuid.slug(),
      userId: decoded.userId,
    },
  });

  const { domain } = useRuntimeConfig().public;

  return `${domain}${url.shortenURL}`;
});
