import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = await useBody(event);

  if (!id)
    return sendError(
      event,
      createError({ statusCode: 400, message: "No url id specified" })
    );

  const prisma = new PrismaClient();

  await prisma.uRL.delete({
    where: { id },
  });

  return event.res.end();
});
