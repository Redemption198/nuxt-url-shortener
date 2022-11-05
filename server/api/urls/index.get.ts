import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

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

  if (!decoded) return sendError(event, createError({ statusCode: 403 }));

  // ---

  const prisma = new PrismaClient();

  return await prisma.uRL.findMany();
});
