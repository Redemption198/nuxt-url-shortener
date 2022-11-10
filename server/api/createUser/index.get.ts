import bcrypt from "bcrypt";
import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const password = "1234";

  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) return sendError(event, createError({ statusCode: 500 }));

    const user = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        name: "Test",
        password: hash,
      },
    });
  });

  return event.res.end();
});
