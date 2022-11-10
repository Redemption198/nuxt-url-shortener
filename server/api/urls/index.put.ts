import jwt from "jsonwebtoken";
import { prisma } from "~~/prisma/db";

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

  const { id: urlId, active } = await useBody(event);

  if (!urlId || active === undefined || active === null)
    return sendError(event, createError({ statusCode: 400 }));

  await prisma.uRL.update({
    where: {
      id: urlId,
    },
    data: {
      active,
    },
  });

  return event.res.end();
});
