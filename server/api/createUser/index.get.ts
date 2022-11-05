import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

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
    console.log(user);
  });

  return event.res.end();
});
